



# HFUTspiderCore

基于koa的hfut教务api server。

#### API文档
https://www.yuque.com/player697/myblog/ridzuw

#### 爬虫开发
实现语言：JavaScript
实现框架：[Koa](https://koa.bootcss.com/)
参考项目：

- [koa官方推荐的 REST Api demo项目](https://github.com/hemanth/koa-rest)   项目结构参考这个
- [基于Express的网易云API Server](https://github.com/Binaryify/NeteaseCloudMusicApi)   项目结构参考这个



#### 实现目标
实现三套api方案，一套针对学校信息门户进入的Web教务系统的接口，一套针对移动端教务App接口，一套针对学校WebVpn的接口。
做到在进行请求时，可以自定义指定一套接口进行数据获取。


#### 开发环境
node环境


#### 依赖的第三方npm包
> 我就不加蓝链了，都是github上搜出来第一个

**koa**基本框架
**koa-route**实现路由
**axios**进行http请求
**nodemon**调试工具，修改代码自动重启项目
**cheerio**  实现html解析
**crypto-js**进行加密操作


#### 上手基础

- JavaScript基础知识（es6的一些基础，比如箭头函数、Promise、async await）
- Koa基础知识
- Web爬虫基础知识


#### 最短上手路线
首先你需要有一定的web开发经验，且最好前后端都了解一些的，至少会做一个动态网站。
之后跟随[这篇教程](http://www.ruanyifeng.com/blog/2017/08/koa.html?bsh_bid=1983230339)学习koa基础，将这篇教程认真看完且最好对每个例子都有自己的发散尝试。
上述达标，就算具备了上手（能大概看懂）本项目的最小技术实力要求了。


