this.bus.$on('eventName', (data) => {
  console.log('添加一条聊天记录');
  console.log(data);
  if (this.msgInfo === null) {
    this.msgInfo = [data]
  } else {
    this.msgInfo.push(data)
  }
})