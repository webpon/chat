const Core = require('@alicloud/pop-core');
const {aliyun} = require("../config/index")

var client = new Core({
    accessKeyId: aliyun.AccessKeyID,
    accessKeySecret: aliyun.AccessKeySecret,
    // securityToken: '<your-sts-token>', // use STS Token
    endpoint: 'https://chatbot.cn-shanghai.aliyuncs.com',
    apiVersion: '2022-04-08'
});

var params = {
    "InstanceId": "chatbot-cn-VZvyVZvEfa",
    "Utterance": "技术栈"
}

var requestOption = {
    method: 'POST',
    formatParams: false,
};
class Bot {
    postBot(msg) {
        return new Promise((resolve, reject)=> {
        params.Utterance = msg
        client.request('Chat', params, requestOption).then((result) => {
            resolve(result["Messages"][0]['Knowledge']["Content"] || result["Messages"][0]['Text']['Content'])
        }, (ex) => {
            reject(ex)
        })
        })
    }
}
module.exports = {Bot}