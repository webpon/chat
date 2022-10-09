import Vue from 'vue'
import { io } from 'socket.io-client'
import router from '@/router/index'
import store from '@/store/index'
const audio = new Audio()
let socket = null
const IS_PROD = process.env.NODE_ENV === "production";
const baseURL = IS_PROD ? 'http://39.103.233.82:14399' : 'http://localhost:14399'
export default () => {
    //设置io连接配置，并且连接
    // if(!localStorage.myInfo){
    // 39.103.233.82
    socket = io(baseURL,
        // socket = io('http://localhost:15000',
        {
            //禁止默认自动断开重连
            reconnection: false,
            autoConnect: false,
            query: {
                "token": localStorage.token,
                "userInfo": localStorage.myInfo
            }
        },
    );
    socket.open()
        //把socket对象与Vue的原型绑定，这样就可以在其他组件引用了
    Vue.prototype.$socket = socket
    try {
        //监听websocket连接成功
        socket.on('connect', () => {
            console.log('websocket连接成功')
            socket.emit('getOnlineUserInfo')
        })
        socket.io.on("error", () => {
            console.log('websocket连接失败')
            Vue.prototype.$message.error('登录失效了, 请重新登录')
            router.replace('/login')
        });
        //监听websocket断开
        socket.on('disconnect', () => {
            console.log('websocket断开连接')
                // 如果token存在，重新连接websocket
            setTimeout(() => {
                const isReconnect = localStorage.token && router.currentRoute.path !== '/login'
                if (isReconnect) {
                    let reconnect = setInterval(() => {
                        socket.open()
                        console.log('正在尝试重新连接')
                        if (socket.connected) {
                            console.log('重新连接成功');
                            clearInterval(reconnect)
                        }
                        if (!isReconnect) {
                            clearInterval(reconnect)
                        }
                    }, 8000);
                }
            }, 1000)
        })

        //监听消息
        socket.on('emitEvent', (data) => {
            audio.src = "https://webpon-img.oss-cn-guangzhou.aliyuncs.com/msg.mp3"
            audio.play();
            // 群聊不需弹窗提醒
            if (data.to !== '群聊') {
                const obj = {
                    username: data.from,
                    imgSrc: data.from_avater,
                    msg: data.msg,
                }
                store.commit('updateChatList', {
                    msgNumber: 1,
                    ...obj
                })
                store.commit('updateMsgHint', {
                    show: true,
                    ...obj
                })
            }
            store.commit('addMsg', data)
        })

        //获取在线用户列表
        socket.on('sendList', (data) => {
            const { onlineUser = [], changeUser = false } = data || {}
            console.log(changeUser);
            store.commit('updateContacts', onlineUser)
            if (!changeUser) return
            if (changeUser && changeUser.isOnline) {
                Vue.prototype.$message.info(`${changeUser.username}登陆了`)
            }
        })
        console.log('APPmounted');
    } catch (error) {
        console.log(error);
    }

}