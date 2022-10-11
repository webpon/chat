export default {
    //当前用户名
    username: 'webpon',
    msgInfo: JSON.parse(localStorage.msgInfo || 'null') || null,
    myInfo: JSON.parse(localStorage.getItem('myInfo')),
    contacts: [],
    chatList: JSON.parse(localStorage.getItem('chatList'))||[
        {
            username: '智能客服',
            msg: '欢迎反馈bug',
            imgSrc: 'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/1.jpg',
            msgNumber: 0
        },
        {
            username: '群聊',
            msg: '在这里可以收到所有人的信息',
            imgSrc: 'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/4.jpg',
            msgNumber: 0
        }
    ],
    playingVideo: null,
    isMobile: false,
    msgHint: {},
    rightClick:{
        show:false,
        axis:{
            x:0,
            y:0
        },
        events:[]
    }
}