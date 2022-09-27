// 以下配置同基础版
const scp2 = require('scp2');
const ora = require('ora');
const chalk = require('chalk');
const path = require('path')
// 服务器信息 这个是本地配置github上不上传
const { ip, username, password } = require('./serverInfo.js')
const spinner = ora('正在发布到服务器上...');

// ssh2 传输
const { Client } = require('ssh2');
const conn = new Client();

let DateObj = new Date();
const currentDay = DateObj.toLocaleDateString()
const currentTime = DateObj.getTime()
// 执行的命令
let cmd = `cd /var/www/html\n
    mkdir -p _backUp/chat/_${currentDay}/${currentTime}\n 
    cp -r /var/www/html/chat /var/www/html/_backUp/chat/_${currentDay}/${currentTime}\n 
    rm -rf /var/www/html/chat
   `;
conn.on('ready', () => {
    console.log('服务器ssh连接成功');
    conn.exec(cmd, (err, stream) => {
        console.log(chalk.green('开始备份'));
        console.log(chalk.yellow(cmd));
        if (err) throw err;
        stream.on('close', () => {
            console.log(chalk.green('备份完毕'));
            spinner.start();
            scp2.scp(
                path.resolve(__dirname, '../dist'),
                {
                    host: ip,
                    port: 22,
                    username,
                    password,
                    path: '/var/www/html/chat'
                },
                function (err) {
                    spinner.stop();
                    if (err) {
                        console.log(chalk.red('Fail! 发布失败.\n'));
                        throw err;
                    } else {
                        console.log(chalk.green('Success! 成功发布到服务器! \n'));
                    }
                }
            );
            conn.end();
        }).on('data', (data) => {
            console.log('STDOUT: ' + data);
        })
    });
}).connect({
    host: ip,
    port: 22,
    username,
    password
}).on('error', function (err) {
    console.log(chalk.red('Fail! 服务器连接失败.\n'));
    throw err;
});
