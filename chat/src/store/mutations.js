const defContacts = [
    {
        username: '群聊',
        msg: '在这里可以收到所有人的信息',
        imgSrc: 'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/4.jpg',
        msgNumber: 0
    },
    {
        username: '智能客服',
        msg: '欢迎反馈bug',
        imgSrc: 'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/1.jpg',
        msgNumber: 0
    },
]
export default {
    addMsg(state, data) {
        if (state.msgInfo === null || !Array.isArray(state.msgInfo)) {
            state.msgInfo = [data]
        } else if (state.msgInfo.length > 1000) {
            state.msgInfo = state.msgInfo.slice(state.msgInfo.length - 490)
            state.msgInfo.push(data)
        } else if (state.msgInfo.length > 500) {
            state.msgInfo.shift()
            state.msgInfo.push(data)
        } else {
            state.msgInfo.push(data)
        }
        localStorage.setItem('msgInfo', JSON.stringify(state.msgInfo))
    },
    updateMyInfo(state, myInfo) {
        state.myInfo = myInfo
    },
    updateContacts(state, contacts) {
        state.contacts = [...defContacts, ...contacts]
    },
    updateChatList(state, chatUser) {
        if (state.chatList.some(item => item.username === chatUser.username)) {
            state.chatList.forEach((item) => {
                if (item.username === chatUser.username) {
                    item.msg = chatUser.msg
                    item.time = chatUser.time
                    item.msgNumber++
                }
            })
        } else {
            chatUser.time = new Date().getTime()
            state.chatList.push(chatUser)
        }
        localStorage.setItem('chatList', JSON.stringify(state.chatList))
    },
    stickChatListByUsername(state, username){
        state.chatList.forEach((item) => {
            if (item.username === username) {
                item.stick = !item.stick
            }
        })
        localStorage.setItem('chatList', JSON.stringify(state.chatList))
    },
    checkDevice(state, isMobile) {
        state.isMobile = isMobile
    },
    updateMsgItemNumber(state, info) {
        state.chatList.forEach((item, i) => {
            if (item.username === info.username) {
                state.chatList[i].msgNumber = 0
            }
        })
        localStorage.setItem('chatList', JSON.stringify(state.chatList))
    },
    updateMsgItemMsg(state, info) {
        state.chatList.forEach((item, i) => {
            if (item.username === info.username) {
                state.chatList[i].msg = info.msg
                state.chatList[i].time = info.time
            }
        })
        localStorage.setItem('chatList', JSON.stringify(state.chatList))
    },
    updatePlayingVideo(state, videoRef) {
        state.playingVideo = videoRef
    },
    updateMsgHint(state, msg) {
        state.msgHint = msg
        setTimeout(() => {
            state.msgHint.show = false
        }, 1200)
    },
    showRightClick(state, data){
        const {b} = data
        state.rightClick.show = b
        if (b) {
            const {axis: {x, y}} = data
            state.rightClick.axis.x = x
            state.rightClick.axis.y = y
        }
    },
    addRightClickEvent(state, events) {
        state.rightClick.events = events
    },
    deleteChatListByUsername(state, username){
        state.chatList.forEach((item, index, array)=>{
            if (item.username === username){
                array.splice(index,1)
            }
        })
        localStorage.setItem('chatList', JSON.stringify(state.chatList))
    }
}