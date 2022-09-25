var express = require('express')
var app = express()
var http = require('http').Server(app)
const jwt = require('jsonwebtoken')
var io = require('socket.io')(http, {
  //由于socket.io使用的并不是ws协议，而是经过一些处理的，所以默认不允许跨域，需要以下配置来允许跨域
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"]
  },
  allowRequest: (req, callback) => {
    jwt.verify(req._query.token, secretKey, (err) => {
      if (err) {
        callback(null, false);
      } else {
        callback(null, true);
      }
    })
  }
})
// 创建一对一传输模型
const loginUser = new Map()
//利用哈希表管理在线用户
//username_socket哈希表
let onlineUser = new Map()
//socketId_data哈希表
let userInfos = new Map()

const secretKey = 'falanter abc sdfjnklsdjfkljsdfkjsdklfjsdkljfklsdjfklj'
//连接成功
io.on('connect', function (socket) {
  console.log('websocket连接成功')
  socket.on("disconnect", (reason) => {
    console.log(userInfos.get(socket.id) && userInfos.get(socket.id).username + '退出登录');
    console.log(reason);
    socket.broadcast.emit('sendList', {
      onlineUser: [...userInfos.values()],
      changeUser: {
        username: userInfos.get(socket.id) && userInfos.get(socket.id).username,
        isOnline: false
      }
    })
    onlineUser.delete(userInfos.get(socket.id) && userInfos.get(socket.id).username)
    userInfos.delete(socket.id)
  });
  socket.on('sendEvent', function (data) {
    const toSocket = onlineUser.get(data.to)
    const fromSocket = onlineUser.get(data.from)
    if(!userInfos.get(socket.id) || userInfos.get(socket.id).username !== data.from) return
    if (data.to === '智能客服' && fromSocket) {
      console.log('智能客服');
      let str = data.msg
      str = str.replace('吗', '')
      str = str.replace(/[?|？]/g, '!')
      str = str.replace('不', '很')
      str = str.replace('你们', '我们')
      str = str.replace('有', '没有')
      str = str.replace('差', '好')
      setTimeout(() => {
        fromSocket.emit('emitEvent', {
          from: '智能客服',
          to: data.from,
          msg: str
        })
      }, 500);
    } else if (data.to === '群聊') {
      socket.broadcast.emit('emitEvent', data)
    } else if (toSocket) {
      toSocket.emit('emitEvent', data)
      console.log('聊天信息发送成功');
    }
  })
  socket.on('getOnlineUserInfo', function () {
    socket.emit('sendList', {
      onlineUser: [...userInfos.values()]
    })
  })
  socket.on('set', function (data) {
    if (data) {
      onlineUser.set(JSON.parse(data).username, socket)
      userInfos.set(socket.id, JSON.parse(data))
      //发送在线用户信息
      socket.broadcast.emit('sendList', {
        onlineUser: [...userInfos.values()],
        changeUser: {
          username: userInfos.get(socket.id) && userInfos.get(socket.id).username,
          isOnline: true
        }
      })
      console.log(userInfos.get(socket.id) && userInfos.get(socket.id).username + '登录了');
    }
  })
})

//允许跨域
app.use(require('cors')())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//连接数据
require('./plugins/mongoose')
//中间件，如果没有token或者token错误则阻止请求

app.use((req, res, next) => {
  console.log(req.headers.origin);
  console.log(req.path);
  console.log(req.body);
  const token = req.headers.authorization;
  if (req.url === '/api/admin/login' || req.url === '/api/admin/create') {
    return next()
    //拒绝没有token的请求
  } else {
    jwt.verify(token, secretKey, (err, data) => {
      if (err) {
        res.status(401).send('token错误')
      } else {
        next()
      }
    })
  }
})
//注册
// 添加用户
app.post('/api/admin/create', async (req, res) => {
  //!数据库操作方法会返回一个promise
  const checkUser = await require('./models/Users').findOne({
    username: req.body.username,
  })
  if (checkUser) {
    return res.status(423).send({
      message: '该用户名称已被注册',
    })
  } else {
    const model = await require('./models/Users').create(req.body)
    res.send(model)
  }
})
//登录
app.use('/api/admin/login', async (req, res, next) => {
  const { username, password } = req.body
  //1、根据用户名找用户
  const adminUser = require('./models/Users')
  const user = await adminUser.findOne({
    username,
  })
  // assert(user, 422, '用户不存在')
  if (!user) {
    return res.status(422).send({
      message: '用户不存在',
    })
  }
  // 2、校验密码
  if (password != user.password) {
    console.log('密码错误');
    return res.status(400).send({
      message: '密码错误',
    })
  }
  //3、返回token
  const jwt = require('jsonwebtoken')
  //参数一，记录的信息，第二个令牌，第三个设置过期时间
  const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1d' })
  return res.send({
    token, userInfo: {
      username: user.username,
      imgSrc: user.imgSrc
    }
  })
})
//监听端口
http.listen(5000, function () {
  console.log('listening on *:5000')
})