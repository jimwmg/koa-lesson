```javascript
npm install 
```

**以下简单介绍下每个文件夹的内容**

### 1 node-http
该文件夹依靠node自带的http模块启动了一个简单的服务，包括作为服务端和客户端的一些简单的代码，用于切入对比koa的服务端是如何启动封装的；
- server.js 启动了一个简单的服务端
- client.js 和 axios.js 使用了一个简单的客户单的http请求；

### 2 koa

该文件夹中主要是koa这个模块的简单使用
- app.js 是koa的简单使用

- myAsync.js 是koa的洋葱模型实现的简单模拟

- myBind.js 是bind函数的简单实现

- myPromise.js 是简单介绍了 async和Promise.resolve以及Promise.reject的源码

### 3 my-compose

- sync.js 主要简单介绍了同步处理数据流的compose和reduce的实现；

- async.js 主要是参考axios源码中增加中间件的源码，可以异步处理数据流；


### 4 webpack-tapable模块

[链接](https://www.pandashen.com/2018/08/06/20180806184412/?from=groupmessage&isappinstalled=0#more)

感兴趣的可以看下这个，不在深入去分享了。
