# react-antd-webpack2-sagas-router4
学习使用react、antd、webpack2、react-routerV4、redux-saga等技术栈Demo
# 说明
>该项目是为了学习react、webpack、antd等相关技术栈而搭建的，希望能在学习的过程中，记录相关的问题。
# 演示
![演示](https://github.com/foxkingpk/react-antd-webpack2-sagas-router4/blob/master/src/assets/imgs/demo.gif?raw=true)
## 安装
进入源码主目录，运行`cnpm install`安装时，可能会比较慢。

这里，推荐使用[淘宝NPM镜像](http://npm.taobao.org/).
直接运行下面语句，以实现cnpm (gzip 压缩支持) 命令行工具代替默认的 npm:
`npm install -g cnpm --registry=https://registry.npm.taobao.org`

然后，运行`cnpm install`，安装完相关的包后，即可进入下一步。
## 启动
运行`cnpm start`，正常情况下，会在默认浏览器中打开网址`http://localhost:3000`.

端口号可以在`scripts/start.js`中，如果已存在`process.evn.PORT`则直接修改其值`process.env.PORT = '3000';`，如果没有，则添加即可。

## RAP
使用`RAP`来模拟demo需要获取的数据，其用法参考[RAP官网](http://rapapi.org/platform/home.do)
不支持在http头里面带入`Authorization token`,所以代码中是将相关代码暂时屏蔽掉的。

## antd
蚂蚁金服出品，非常棒的UI库，使用起来还是挺方便的，其用法参考[antdesign官网](https://ant.design/index-cn)
## 其他库
`axios`

基于 Promise 的 HTTP 请求客户端，可同时在浏览器和 node.js 中使用

`redux-saga`

[中文文档](http://leonshi.com/redux-saga-in-chinese/index.html)

## 打包部署
运行`cnpm run build`，将资源打包输出到`build`目录。
## 编译、运行问题
1. 如果编译出错，请删除node_modules目录，重新cnpm install再试。因为有些版本更新了依赖包，需要安装
## 初学知识点
### 一、create-react-app脚手架
facebook官方推出的脚手架，功能还是很强大，对于新手开发完全够用了。具体配置请[点我](https://github.com/facebookincubator/create-react-app)

### 二、token机制
  在成功登录后，将获取的token保存在redux和localStorage中, 以后每次api请求时，将token带到http头里面。具体可参考`src/http/index.js`
   http请求使用的事axios库，其提供了请求和响应的拦截器，这样可以方便我们进行相关处理，比如：NProgress控件的使用
   ```javascript
   axios.interceptors.request.use(
    (config) => {
      if (localStorage.token) {
        config.headers.Authorization = `token ${localStorage.token}`;
      }
      NProgress.start();//加载进度条显示
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
```
如果遇到token过期等情况根据和服务端的约定，下发相关的状态码，在响应拦截器`axios.interceptors.response.use`中进行相关处理即可。

当刷新页面或者重新进入页面时，redux中保存的信息就会丢失，此时从localStorage中读取token相关信息，调用登录接口，具体实现`src/utils/init.js`中。

### 三、打包的js文件过大，怎么办？

create-react-app默认打包出来只有一个js文件，这样就会出现js文件体积过大。
这里简单的说说我的做法：
1. 配置webpack, 将第三方库打包出独立的js文件, 至于为什么会多出manifest？主要解决每次打包出来的文件hash值都会该变的问题，具体代码如下：
```javascript
  entry: {
    main: [
      require.resolve('./polyfills'),
      paths.appIndexJs
    ],
    vendor: [
      'react',
      'react-router',
      'react-redux',
      'redux-saga',
      'react-router-dom'
    ]
  }
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        names: ['main', 'vendor', 'manifest']
    })
  ]
```
2. 使用`code split`，其原理是：按需加载，举例说明：进入登录页面，那么我们就只加载登录页面需要的资源；其它的资源先不加载，这样就加快了页面的呈现速度。网上的介绍文章也很多，这里推荐一篇[请点我](http://serverless-stack.com/chapters/code-splitting-in-create-react-app.html)。

我的代码实现是使用`react-loadable`库，具体实现在`src/components/loading.jsx`文件，调用的地方在`src/containers/express.jsx`文件，我这里只是为了演示代码分割的功能，所以只在express.jsx中使用了代码分割，并且该功能最好在`cnpm run build`打包时再使用，在开发模式中要是开启代码分割，好像会影响热加载速度（修改文件后，编译变慢）。

### 四、页面滚动后，当打开新页面时，页面还是停留在之前的位置，怎么办？
在开发spa页面时，会发现如果当前页面出现滚动条时，此时打开新的页面，如果新的页面比较长的情况下，就会发现新的页面不是从页面顶部显示。
解决办法： 切换页面时，使用`window.scroll(0, 0)`函数将页面滚动到顶部。
具体实现：参考`src/containers/scroll-to-top.jsx`组件，然后其使用是在`src/main.js`中；

### 五、前后端分离，如何解决跨域问题
1. 配置package.json
在开发模式，我们只需在`package.json`中增加字段`"proxy": 'http://serverip'`，将serverip替换成你的服务端提供的接口地址。
2. 使用Nginx反向代理
 使用Nginx反向代理还是比较强大，不局限于开发模式。
 使用时，只需配置Nginx的配置文件即可，但是需要注意一点：location的配置路径。
 比如：服务端提供的接口地址是：http://192.168.16.200:8080, 我们的开发模式开启的端口假设是3000,
 ```javascript
 server {
        listen       80;
        server_name  localhost;

        location  / {
            proxy_pass   http://127.0.0.1:3000;
        }
        #说明： 只有地址以'http://localhost/yq'开始的接口请求才会被Nginx代理到真正的服务器地址（http://192.168.16.200:8080），当然这里的/yq不是乱写的，和你的接口请求地址相关。其实可以这么理解：
        你的代码中登录接口地址:'/yq/api/v1/user/sigin'，通过Nginx访问时，请求地址成为`http://localhost/yq/api/v1/user/sigin`，Nginx检测到请求地址以'http://localhost/yq'开头，那么就会将该请求地址代理到真正的服务器接口地址上`http://192.168.16.200:8080/yq/api/v1/user/sigin`
        location /yq { 
            proxy_pass http://192.168.16.200:8080;
            # nginx非80端口处理
            proxy_set_header Host $host:$server_port;
            # 获取真实IP
            proxy_set_header X-Real-IP $remote_addr;
            # 获取代理者的真实ip 
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto  $scheme;
        }
 }
  ```

