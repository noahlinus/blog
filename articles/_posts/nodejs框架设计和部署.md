---
title: nodejs框架设计和部署
date: 2019-11-01 15:06:34
tags: node.js
header_img:
---

# 主题

主要介绍 node.js 的框架的技术选型和框架搭建，以及如何在服务器上部署发布。这里客户端使用小程序来介绍。小程序主要功能涉及到用户授权登录，地图定位，webSocket 发送定位，二维码扫描添加设备。

## 技术选型

- Koa2，http 的框架
- Mongodb，非关系型数据库，配合 typegoose 的库来编写
- ws，封装 webSocket 的一个模块
- jsonwebtoken，生成 token 的库
- TypeScript 使用 ts-node 的库来启动
- pm2，进程管理，日志查看，服务器部署的工具

Koa+Typescript，除了本身类型系统对数据库的数据模型定义有好处外。Koa 中间件的 context 有很多库或者用户自定义数据结构挂载在上面，如果没有类型声明，开发者可能不知道 context 上有哪些类型，导致工程维护性增加。

Mongodb（[https://www.mongodb.com/cn](https://www.mongodb.com/cn)）Mongodb 本身查询语法是 JS 写的，很符合前端的使用。基于文档处理，本身查询速度也比较快。关联表的结构设计，也相当简单，学习成本低。对于前端来说对表的设计经验不足，如果使用 mysql 之类的关系型数据库，如果设计不当，很可能导致性能问题。

pm2 是 node 社区比较成熟的进程管理框架，本身自带日志查看，错误重启，服务器部署的能力。

## 工程结构

整体工程的设计使用 mvc 的结构，Koa 中间件，使用 TS 类型辅助。

### 目录

-src
 --api  接口的 api 比如微信小程序登录授权相关的 api
 --config  配置项
 --const  常量
 --controllers 控制层
 --interfaces 接口
 --middleware 自定义中间层
 --modules 模型层，主要放数据库相关的模型数据
 --types ts 拓展类型
 --utils 工具包，放请求，logger，配置，jwt 相关的工具
 --server.ts 服务启动入口
-.env 全局常量配置（用户自定义的，不提交 git）
-.env.example 全局常量配置
-ecosystem.config.js pm2 的配置文件，部署的时候自动执行

## 开发环境配置和启动

### 数据库

#### 安装

数据库：[https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)
可视化工具：[https://www.mongodb.com/download-center/compass](https://www.mongodb.com/download-center/compass)    选择社区免费版本

#### 配置

输入 mongo 就可以连接。最好配置用户和密码，虽然本地未必要配置密码，但是服务端肯定要配置的，所以就先介绍下如何配置。

1. 命令行输入 mongo，进入数据库 shell
1. 输入 use admin 进入数据库
1. 创建管理员账户

```javascript
db.createUser({
  user: 'useradmin',
  pwd: 'adminpassword',
  roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }],
})
```

4. 验证是否添加成功 db.auth("useradmin", "adminpassword")，成功返回 1，然后输入 exit 退出
5. 修改配置文件 mac 在/usr/local/etc/mongod.conf 下，输入 code /usr/local/etc/mongod.conf 最后一行添加(注意缩进)

```javascript
security: authorization: enabled
```

6.重启服务

```shell
brew services restart
```

7.创建一个应用的数据库 use app_db 8.对这个应用的数据库创建权限

```javascript
// 拥有者
db.createUser({
  user: 'youruser',
  pwd: 'yourpassword',
  roles: [
    {
      role: 'dbOwner',
      db: 'app_db',
    },
  ],
})

// 可读写
db.createUser({
  user: 'youruser2',
  pwd: 'yourpassword2',
  roles: [
    {
      role: 'readWrite',
      db: 'app_db',
    },
  ],
})
```

9.最后可以输入连接来启动

```javascript
mongodb://youruser2:yourpassword2@localhost/app_db
```

10、可以使用可视化工具 compass 连接

### 项目配置

重命名.env.example 为.env，基本的.env 代码如下

```js
// 这个是ENV全局变量，其中变量NODE_ENV在开始执行创建， development: 是开发环境，production：是生产环境。

// mongodb的地址 production生产环境依赖
MONGODB_URI=mongodb://<mlab_user>:<mlab_password>@<mlab_connection_url>

// mongodb的地址 developmet开发环境依赖
MONGODB_URI_LOCAL=mongodb://localhost:27017/go_app

// token的秘钥
TOKEN_KEY=ting.ting@huang_GO!GO!GO!!!

// 微信AppId
WX_APP_ID=wx0840e0b26c481112

// 微信的AppSecret
WX_APP_SECRET=34c4824eb1115281d249e85dba4f8157
```

### 项目启动

安装 ts-node 和 typescript 到开发环境

使用 npm start 命令启动，安装 nodemon 到开发环境，然后如下输入命令

```shell
nodemon --watch 'src/**/*' -e ts,tsx --exec 'ts-node' ./src/server.ts
```

使用 vscode，这里是我推荐的方式。然后配置 launch.json，使用 F5 启动、调试。

```json
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "runtimeArgs": ["-r", "ts-node/register"],
      "args": ["${workspaceFolder}/src/server.ts"],
      "env": {
        "NODE_ENV": "development"
      },
      "sourceMaps": true,
      "cwd": "${workspaceRoot}",
      "protocol": "inspector",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## 服务器配置和部署

服务器使用 CentOS，之所以不使用 ubuntu，是因为没必要使用到界面，也是大多数服务器采用到的方案。当然使用 ubuntu 也没什么问题，内核都一样。然后使用 yum 安装一些常用的工具库。

### 连接服务器

首先在本机上创建 ssh 公钥和秘钥，然后去服务器添加公钥，然后连接服务器。
命令如下 ssh -q -l root -p 22 111.230.28.25

### 安装数据库

和开发环境配置类似，只是都是 linux 下的，创建密码和本地使用 compass 连接验证。这里注意记得在要给服务开端口。

### Nginx 安装和配置

网上教程很多，我这里主要介绍使用 yum 来安装 Nginx，使用 yum 安装非常简单。使用 systemctl 来启动（当然也有使用 service，但是不能开机启动了），有兴趣想了解 systemctl 相关命令可以看看这个[http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html](http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html)

#### 安装

1. 因为 Nginx 不在 yum 的默认源中，所以要手动添加源

```shell
$ sudo rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

2. 安装

```shell
$ sudo yum install nginx
```

#### 配置

安装完 Nginx，会生成一个配置文件，路径是：/etc/nginx/nginx.conf。输入命令 vim nginx.conf 来编辑

```shell
user  nginx;
worker_processes 1;
events {
   worker_connections 1024;
}
error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
http {
   server {
       listen  80;
       server_name localhost;
       location / {
           proxy_pass  http://127.0.0.1:8088;
           proxy_set_header   Host             $host;
           proxy_set_header   X-Real-IP        $remote_addr;
           proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
       }
       location ^~ /websocket/ {
           proxy_pass  http://127.0.0.1:8088;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "Upgrade";
       }
    }
     server {
        listen          443 ssl;
        server_name     localhost
        ssl             on;
        ssl_certificate cert/2760618_www.dayuan.tech.pem;
        ssl_certificate_key  cert/2760618_www.dayuan.tech.key;
        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDH:AESGCM:HIGH:!RC4:!DH:!MD5:!3DES:!aNULL:!eNULL;
        ssl_prefer_server_ciphers  on;
        location / {
            proxy_pass http://127.0.0.1:8088;
            proxy_set_header        Host    $http_host;
            proxy_set_header        X-Real-IP       $remote_addr;
            proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
        }
        location ^~ /websocket/ {
            proxy_pass http://127.0.0.1:8088;
            proxy_set_header        Host    $http_host;
            proxy_set_header        X-Real-IP       $remote_addr;
            proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
    }
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;

    #tcp_nopush     on;

    keepalive_timeout  65;

    gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

#### 启动

设置开机启动

```shell
systemctl enable nginx
```

启动服务

```shell
systemctl start nginx
```

停止服务

```shell
systemctl stop nginx
```

重新启动服务

```shell
systemctl restart nginx
```

热更新，也就是不想重新启动整个服务，只想重新加载配置文件

```shell
systemctl reload nginx
```

## 小程序登录模块

![image.png](node.js框架设计和部署/weixin_login.png)

和这里图有点不同的是，登录凭证校验完后，我是使用一个会过期 token 来验证。验证成功后客户端会发送一次获取头像和昵称等用户基本信息的请求，获取后，再把这些传回给开发者服务器。以后用户基本信息都从开发者服务器获取就好。
还有一个主意点微信的 auth.getAccessToken，需要定期获取，具体如下[https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html)。

## Koa 控制层统一处理

```typescript
// 路由模块使用前需要先安装和实例化
import Router from 'koa-router'
import fs from 'fs'
import checkToken from '@/middleware/checkToken'

const router = new Router()

/**
 * 将所有controller下的文件都加载到router
 */
let urls = fs.readdirSync(__dirname + '/../controllers')

// 所有请求api路由前都要经过这个控制层
router.use('/api', checkToken)

urls.forEach((element: string) => {
  let module = require(__dirname + '/../controllers/' + element)
  router.use('/api', module.default.routes(), module.default.allowedMethods())
})

export default router
```

## 模型层使用 Typegoose

如果不用 Typegoose

```typescript
interface Car {
  model?: string;
}

interface Job {
  title?: string;
  position?: string;
}

interface User {
  name?: string;
  age: number;
  job?: Job;
  car: Car | string;
}

mongoose.model('User', {
  name: String,
  age: { type: Number, required: true },
  job: {
    title: String;
    position: String;
  },
  car: { type: Schema.Types.ObjectId, ref: 'Car' }
});

mongoose.model('Car', {
  model: string,
});
```

用了以后

```typescript
class Job {
  @prop()
  title?: string

  @prop()
  position?: string
}

class Car extends Typegoose {
  @prop()
  model?: string
}

class User extends Typegoose {
  @prop()
  name?: string

  @prop({ required: true })
  age!: number

  @prop()
  job?: Job

  @prop({ ref: Car })
  car?: Ref<Car>
}
```

## WebSocket 配置

无论是 kos 还 webSocket 都是调用 Node 标准的 http 模块创建的 http.Server 监听的，koa 只是把响应的函数注册到 http.Server，同理 WebSocket 也可以把响应的函数注册到 http.Server，所以可以使用同一个端口。我是对 webSokcet 做了一层封装，其中连接的代码如下

```typescript
function connectSocket(server: Server) {
  wss = new WebSocketServer({ server })
  wss.on('connection', onConnection)
  server.on('upgrade', (request, socket, head) => {
    const pathname = url.parse(request.url).pathname
    if (pathname === '/websocket/location') {
      wss.handleUpgrade(request, socket, head, ws => {
        wss.emit('connection', ws, request)
      })
    }
  })
}
```
