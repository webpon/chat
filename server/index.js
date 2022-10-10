var express = require('express')
var app = express()
require("dotenv").config()
var http = require('http').Server(app)
const jwt = require('jsonwebtoken')
const { Email } = require('./models/Email');
const { tokenKey } = require('./config')
const { Bot } = require('./models/Bot')
const bot = new Bot();
var io = require('socket.io')(http, {
    //由于socket.io使用的并不是ws协议，而是经过一些处理的，所以默认不允许跨域，需要以下配置来允许跨域
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT"]
    },
    allowRequest: (req, callback) => {
        jwt.verify(req._query.token, tokenKey, (err) => {
            if (err) {
                callback(null, false);
            } else if (req._query.userInfo) {
                const userInfo = JSON.parse(req._query.userInfo)
                // 3、防止重复登录
                if (onlineUser.get(userInfo.username)) {
                    callback(null, false);
                } else {
                    callback(null, true);
                }
            }
        })
    }
})
//利用哈希表管理在线用户
//username_socket哈希表
let onlineUser = new Map()
//socketId_data哈希表
let userInfos = new Map()
const email = new Email();
//连接成功
io.on('connect', function (socket) {
    const { userInfo = '' } = socket.handshake.query || {}
    const userInfoData = JSON.parse(userInfo)
    if (userInfoData) {
        onlineUser.set(userInfoData.username, socket)
        userInfos.set(socket.id, userInfoData)
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
        if (!userInfos.get(socket.id) || userInfos.get(socket.id).username !== data.from) return
        if (data.to === '智能客服' && fromSocket) {
            console.log('智能客服');
            let str = data.msg
            const send = {
                from: '智能客服',
                to: data.from,
                msg: str,
                msgId: data.msgId,
                from_avater: 'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/1.jpg'
            }
            if (!/^bug[:|：].*/.test(str)) {
                bot.postBot(str).then((content) => {
                    send.msg = content
                    setTimeout(() => {
                        fromSocket.emit('emitEvent', send)
                    }, 100);
                })
            } else {
                email.sendMsg(str.slice(4), (error) => {
                    if (error) {
                        console.log(error)
                    }
                    send.msg = "感谢你的反馈"
                    setTimeout(() => {
                        fromSocket.emit('emitEvent', send)
                    }, 500);
                })
            }
        } else if (data.to === '群聊') {
            socket.broadcast.emit('emitEvent', data)
        } else if (toSocket) {
            toSocket.emit('emitEvent', data)
            console.log('聊天信息发送成功');
        }
    })
    socket.on('getOnlineUserInfo', function () {
        socket.emit('sendList', {
            onlineUser: [...userInfos.values()],
        })
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
    if (req.url === '/api/admin/login' || req.url === '/api/admin/create' || req.url === '/api/admin/visitor') {
        return next()
        //拒绝没有token的请求
    } else {
        jwt.verify(token, tokenKey, (err, data) => {
            if (err) {
                res.status(401).send('token错误')
            } else {
                next()
            }
        })
    }
})
app.get('/api/admin/user', async (req, res, next) => {
    const adminUser = require('./models/Users')
    console.log(req.query);
    const { id } = req.query
    const user = await adminUser.findOne({
        _id: id
    })
    return res.send({
        userInfo: {
            username: user.username,
            imgSrc: user.imgSrc
        }
    })
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
    // 3、防止重复登录
    if (onlineUser.get(username)) {
        return res.status(424).send({
            message: '你已经在别处登录了',
        })
    }
    //3、返回token
    const jwt = require('jsonwebtoken')
    //参数一，记录的信息，第二个令牌，第三个设置过期时间
    const token = jwt.sign({ id: user._id }, tokenKey, { expiresIn: '1d' })
    return res.send({
        token,
        userInfo: {
            username: user.username,
            imgSrc: user.imgSrc
        }
    })
})
//游客登录
app.use('/api/admin/visitor', async (req, res, next) => {
    const client_ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0]
    console.log(client_ip);
    const user_id = client_ip + '|' + onlineUser.size
    //3、返回token
    const jwt = require('jsonwebtoken')
    //参数一，记录的信息，第二个令牌，第三个设置过期时间
    const token = jwt.sign({ id: user_id, type: 'visitor' }, tokenKey, { expiresIn: '1d' })
    return res.send({
        token,
        userInfo: {
            username: user_id,
            type: 'visitor',
            imgSrc: 'https://p.ssl.qhimg.com/t0126d6aa871801abe1.png'
        }
    })

})
//监听端口
http.listen(14399, function () {
    console.log('listening on *:14399')
})