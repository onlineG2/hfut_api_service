
# hfut_api_service 开发/使用文档

基于koa的hfut教务api服务。

#### 支持的目标平台

- App端教务
- Web端教务
- WebVPN端教务


#### 支持的接口

- 教务账号密码登录
- 获取个人信息
- 获取课表信息
- 获取成绩信息
- 获取考试安排
- 获取一门课程的所有同学信息
- 获取当日事件
- 获取评教信息
- 获取选课开放状态
- 获取专业培养计划
- 获取一个可用的WebVPN ticket

#### API文档
https://www.yuque.com/player697/myblog/ridzuw


#### 项目架构
实现语言：JavaScript <br>
实现框架：[Koa](https://koa.bootcss.com/) <br>
参考项目： <br>

- [koa官方推荐的 REST Api demo项目](https://github.com/hemanth/koa-rest)   项目结构参考这个
- [基于Express的网易云API Server](https://github.com/Binaryify/NeteaseCloudMusicApi)   项目结构参考这个



#### 实现目标
实现三套api方案，一套针对学校信息门户进入的Web教务系统的接口，一套针对移动端教务App接口，一套针对学校WebVpn的接口。
做到在进行请求时，可以自定义指定一套接口进行数据获取。



#### 依赖的第三方npm包
> 我就不加蓝链了，都是github上搜出来第一个

**koa**基本框架 <br>
**koa-route**实现路由 <br>
**axios**进行http请求 <br>
**nodemon**调试工具，修改代码自动重启项目 <br>
**cheerio**  实现html解析 <br>
**crypto-js**进行加密操作 <br>


#### 上手基础

- JavaScript基础知识（es6的一些基础，比如箭头函数、Promise、async await）
- Koa基础知识
- Web爬虫基础知识


#### 最短上手路线
首先你需要有一定的web开发经验，且最好前后端都了解一些的，至少会做一个动态网站。
之后跟随[这篇教程](http://www.ruanyifeng.com/blog/2017/08/koa.html?bsh_bid=1983230339)学习koa基础，将这篇教程认真看完且最好对每个例子都有自己的发散尝试。
上述达标，就算具备了上手（能大概看懂）本项目的最小技术实力要求了。


