var express = require('express')
var app = express()
var http = require('http').Server(app)
const jwt = require('jsonwebtoken')
const hashTable = require('./utils/hashTable')
var io = require('socket.io')(http, {
  //由于socket.io使用的并不是ws协议，而是经过一些处理的，所以默认不允许跨域，需要以下配置来允许跨域
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})
//统计人数
var connections = []
// 创建一对一传输模型
// var userInfos = new Set()
//利用哈希表管理在线用户
//username_socket哈希表
let onlineUser = new hashTable()
//username_data哈希表
let userInfos = new hashTable()
//username_data
let id_name = new hashTable()
setInterval(() => {
  console.log(onlineUser);
}, 5000);
//连接成功
io.on('connect', function (socket) {
  
  console.log('websocket连接成功')
  connections.push(socket)
  console.log(socket.id+'登录了');
  socket.on("disconnect", (reason) => {
    console.log(id_name.get(socket.id)+'退出登录');
    console.log(reason);
    onlineUser.remove(id_name.get(socket.id))
    userInfos.remove(id_name.get(socket.id))
    id_name.remove(socket.id)
  });
  socket.on('sendEvent', function (data) {
    if(data.to === '智能客服'){
      let str = data.msg
      str = str.replace('吗','')
      str = str.replace(/[?|？]/g, '!')
      str = str.replace('不', '很')
      str = str.replace('你们', '我们')
      str = str.replace('有', '没有')
      str = str.replace('差','好')
      setTimeout(() => {
        socket.emit('emitEvent', {
          from: '智能客服',
          to: data.from,
          msg: str
        })
      }, 500);
      return
    }
    let toUser = onlineUser.get(data.to)
    console.log(data);
    if (toUser) {
      console.log(toUser.id);
      toUser.emit('emitEvent', data)
      console.log('聊天信息发送成功');
    }

  })
  socket.on('getOnlineUserInfo', function (data) {
    socket.emit('sendList', userInfos.getAllElement())
      console.log('在线用户列表信息发送成功');

  })
  socket.on('set', function (data) {
    console.log(JSON.parse(data));
    if (data) {
      console.log(data);
      onlineUser.put(JSON.parse(data).username, socket)
      userInfos.put(JSON.parse(data).username, JSON.parse(data))
      id_name.put(socket.id, JSON.parse(data).username)
      //发送在线用户信息
      socket.emit('sendList', userInfos.getAllElement())
      socket.broadcast.emit('sendList', userInfos.getAllElement())

      console.log(onlineUser);
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
  console.log(req.body);
  if (req.url === '/api/admin/login' || req.url === '/api/admin/create') {
    return next()
    //拒绝没有token的请求
  } else if (req.url !== '/api/admin/login' && !req.body.token) {
    console.log('没有token');
    return res.status(401).send('token不存在')
    //验证token
  } else if (req.url !== '/api/admin/login' && req.body.token) {
    jwt.verify(req.headers.authorization, 'random', (err, data) => {
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
    return res.status(422).send({
      message: '该用户名称已被注册',
    })
  } else {
    console.log(req.body);
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
  console.log(user);
  const token = jwt.sign({ id: user._id }, 'random', { expiresIn: '7d' })
  return res.send({ token ,userInfo:user})
})
//监听端口
http.listen(5000, function () {
  console.log('listening on *:5000')
})