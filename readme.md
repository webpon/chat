## 线上案例：http://39.103.233.82/chat/

### 开发

#### 客户端 /chat/chat（默认连接线上环境，不需要开启服务端，如果有需要，请把network中的index和websocket对应baseurl更换为localhost的）
技术栈
```
vue, ant-ui
```
运行
```
npm i 
npm run serve
```

#### 聊天服务端 /chat/server

注意：需要安装mongodb
需在服务器根路径下创建
```
config/index.js
```
然后写入配置，如下
```js
const mail_config = {
    host: '邮箱服务器',
    port: 25,
    auth: {
        user: '邮箱的账号', 
        pass: 'fdxmyiymilohbgjc'
    }
}

const mail_options = {
    from: 邮件来源,
    to: 邮件发送到哪里，多个邮箱使用逗号隔开,
    subject: 邮件主题,
    text: 存文本类型的邮件正文
};
// 详细请看阿里云官网，并开启智能对话机器人
const aliyun = {
    AccessKeyID: 阿里云账号信息,
    AccessKeySecret: 阿里云账号信息
}

const tokenKey = 密钥

module.exports = {
    mail_config,
    mail_options,
    tokenKey,
    aliyun
}
```
启动命令
```
node index.js
```
#### 朋友圈服务器 /chat/moments
技术栈：
```
java,springboot,mybatis
```
配置好数据库就行
#### oss签名服务器 /chat/moments
技术栈:
```
node,第三方SDK
```
