var app = require('express')()
var http = require('http').Server(app)
const bodyParser = require('body-parser')
const { LOADIPHLPAPI } = require('dns')
const jwt = require('jsonwebtoken')
var io = require('socket.io')(http, {
  //配置允许跨域
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})
//允许跨域
app.use(require('cors')())
const User = require('./models/Users')
//统计人数
var connections = []
// 创建一对一传输模型
var userInfos = []
//连接成功
io.on('connect', function (socket) {
  connections.push(socket)
  console.log(socket.id + '登陆了')
  console.log('User connected:' + connections.length + ' online')
  socket.on('set', function (data) {
    data = JSON.parse(data)
    console.log(data);
    userInfos.push({
      id: socket.id,
      username: data.username,
    })
    console.log('成功注册了' + data.username)
    socket.broadcast.emit('sendList', userInfos)
    // 对除当前socket连接的其他所有socket连接发消息
    socket.broadcast.emit('broadcast', data) //broadcast广播事件，客户端按普通的监听该事件就行了，
    // 断开连接
  })
  //监听在线用户列表请求
  // socket.on('onlineList', function (data) {
  // 发送用户列表
  // console.log(userInfos)
  socket.emit('sendList', userInfos)
  // })
  socket.on('disconnect', function (data) {
    var mdata = null
    console.log('断开连接')
    connections.splice(connections.indexOf(socket), 1)
    // console.log(userInfos)
    userInfos.forEach((item, index) => {
      if (item.id == socket.id) {
        // console.log(item)
        mdata = item
      }
      // console.log('ok')
      console.log(mdata)
    })
    // console.log(mdata)
    // userInfos.splice(userInfos.indexOf(mdata), 1)
    console.log('User disconnected :' + connections.length + 'online')
  })
})


app.set('select', '232132jsadjsadkj')
//连接数据据
require('./plugins/mongoose')
//允许跨域
app.use(require('cors')())
//处理post参数
// app.use(express.json())
// !处理x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// !处理json
app.use(bodyParser.json())
// 文件上传
// let upload = require('./routes/upload')
// app.use('/api/admin/uploads', upload)
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
    const model = await require('./models/Users').create(req.body)
    res.send(model)
  }
})
//登录
app.use('/api/admin/login', async (req, res, next) => {
  const { username, password } = req.body
  // console.log(username)
  //1、根据用户名找用户
  const adminUser = require('./models/Users')
  const user = await User.findOne({
    username,
  })
  // assert(user, 422, '用户不存在')
  if (!user) {
    return res.status(422).send({
      message: '用户不存在',
    })
  }
  // 2、校验密码
  // const isValid = require('bcrypt').compareSync(password, user.password)
  // console.log(require('bcrypt').compareSync(password, user.password))
  if (password != user.password) {
    return res.status(400).send({
      message: '密码错误',
    })
  }
  //3、返回token
  const jwt = require('jsonwebtoken')
  const token = jwt.sign({ id: user._id }, app.get('select'))
  return res.send({ token })
})

http.listen(5000, function () {
  console.log('listening on *:5000')
})
