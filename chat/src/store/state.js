export default {
    //当前用户名
    username: 'webpon',
    msgInfo: JSON.parse(localStorage.msgInfo || 'null') || null,
    myInfo: JSON.parse(localStorage.getItem('myInfo')),
    contacts: [],
    chatList: JSON.parse(localStorage.getItem('chatList'))||[],
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