const nodemailer = require('nodemailer');
const {mail_config, mail_options} = require("../config");
class Email {
    constructor() {
        this.transport = nodemailer.createTransport(mail_config)
    }

    sendMsg (msg, fun){
        mail_options.text = msg
        this.transport.sendMail(mail_options, fun)

    }
}
module.exports = {Email}