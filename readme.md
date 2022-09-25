## 线上案例：http://39.103.233.82/chat/

### 开发

#### 客户端 /chat/chat（默认连接线上环境，不需要开启服务端，如果有需要，请把network中的index和websocket对应baseurl更换为localhost的）

```
npm i 
npm run serve
```

#### 服务端 /chat/server

注意：需要安装mongodb

```
node index.js
```

