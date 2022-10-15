const nodemailer = require('nodemailer');
const { mail_config } = require("../config");
class Email {
    constructor() {
        this.transport = nodemailer.createTransport(mail_config)
    }

    sendMsg({
        from = '"Fred Foo " <210579781@qq.com>', 
        to = '210579781@qq.com, 2249096563@qq.com', //邮件发送到哪里，多个邮箱使用逗号隔开
        subject = '来自http://39.103.233.82/chat/ bug反馈', // 邮件主题
        text = 'Hello world ?', // 存文本类型的邮件正文
    }, fun) {
        this.transport.sendMail({
            from,
            to,
            subject,
            text
        }, fun)
    }
}
module.exports = { Email }