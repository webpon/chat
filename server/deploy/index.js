// 以下配置同基础版
const scp2 = require('scp2');
const ora = require('ora');
const chalk = require('chalk');
const path = require('path')
// 服务器信息 这个是本地配置github上不上传
const { ip, username, password } = require('./serverInfo.js')
const spinner = ora('正在发布到服务器上...\n');

// ssh2 传输
const { Client } = require('ssh2');
const conn1 = new Client();
var conn2 = new Client();

// 执行的命令
let cmd = `rm /var/www/html/chatServer/index.js`;
const restartServer = `pm2 restart /var/www/html/chatServer/index.js`
conn1.on('ready', () => {
    console.log('服务器ssh连接成功');
    conn1.exec(cmd, (err, stream) => {
        ;
        if (err) throw err;
        stream.on('close', () => {
            spinner.start();
            scp2.scp(
                path.resolve(__dirname, '../index.js'),
                {
                    host: ip,
                    port: 22,
                    username,
                    password,
                    path: '/var/www/html/chatServer'
                },
                function (err) {
                    if (err) {
                        console.log(chalk.red('服务器上传失败！\n'));
                        throw err;
                    } else {
                        restart()
                    }
                    spinner.stop();
                }
            );
            conn1.end()
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

function restart() {
    conn2.on('ready', () => {
        console.log('服务器ssh连接成功');
        conn2.exec(restartServer, (err, stream) => {
            if (err) throw err;
            stream.on('close', () => {
                console.log(chalk.green('服务器重启成功.\n'));
                conn2.end()
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
}
