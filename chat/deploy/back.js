// 以下配置同基础版
const scp2 = require('scp2');
const ora = require('ora');
const chalk = require('chalk');
const path = require('path')
    // 服务器信息 这个是本地配置github上不上传
const { ip, username, password } = require('./serverInfo.js')

// ssh2 传输
const { Client } = require('ssh2');
const conn = new Client();

let DateObj = new Date();
const currentDay = DateObj.toLocaleDateString()
const currentTime = DateObj.getTime()
    // 执行的命令
let cmd = `cd /var/www/html\n
    rm -rf /var/www/html/chat\n
    cp -r /var/www/html/_backUp/chat/_2022-10-2/1664712353651/chat /var/www/html/chat\n
   `;
conn.on('ready', () => {
    console.log('服务器ssh连接成功');
    conn.exec(cmd, (err, stream) => {
        console.log(chalk.green('开始回滚'));
        console.log(chalk.yellow(cmd));
        if (err) throw err;
        stream.on('close', () => {
            console.log(chalk.green('回滚完毕'));
            conn.end()
        }).on('data', (data) => {
            console.log('STDOUT: ' + data);
        })
    });
}).connect({
    host: ip,
    port: 22,
    username,
    password
}).on('error', function(err) {
    console.log(chalk.red('Fail! 服务器连接失败.\n'));
    throw err;
});