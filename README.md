# react-antd-webpack2-sagas-router4
学习使用react、antd、webpack2、react-routerV4、redux-saga等技术栈Demo
# 说明
>该项目是为了学习react、webpack、antd等相关技术栈而搭建的，希望能在学习的过程中，记录相关的问题。

## 安装
进入源码主目录，运行`cnpm install`安装时，可能会比较慢。

这里，推荐使用[淘宝NPM镜像](http://npm.taobao.org/).
直接运行下面语句，以实现cnpm (gzip 压缩支持) 命令行工具代替默认的 npm:
`npm install -g cnpm --registry=https://registry.npm.taobao.org`

然后，运行`cnpm install`，安装完相关的包后，即可进入下一步。
## 启动
运行`cnpm run dev`，正常情况下，会在默认浏览器中打开网址`http://localhost:9110`.

## 数据模拟（Mockjs)
使用`mockjs`来模拟demo需要获取的数据，其实现主要在`mockjs`目录，其用法参考[mockjs官网](http://mockjs.com/)

## antd
蚂蚁金服出品，非常棒的UI库，使用起来还是挺方便的，其用法参考[antdesign官网](https://ant.design/index-cn)
## 其他库
`axios`

基于 Promise 的 HTTP 请求客户端，可同时在浏览器和 node.js 中使用

`redux-saga`

[中文文档](http://leonshi.com/redux-saga-in-chinese/index.html)
## 打包部署
运行`cnpm run build`，将资源打包输出到`dist`目录。

