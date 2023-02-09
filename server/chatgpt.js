const { openApiKey } = require('./config')
import('chatgpt').then(async (res) => {
  const ChatGPTAPI = new res.ChatGPTAPI({
    apiKey: openApiKey
  })
  ChatGPTAPI.sendMessage('1').then(res => {
    data.msg = res.text
    console.log(res)
  }).catch((err) => {
    console.log('111111111')
    console.log(err)
  })
})