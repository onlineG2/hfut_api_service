// 学校web教务采用302重定向的方法获取同学的教务id（在数据中表现为dataId，比如我的id是98911）
// 这里我采取一个钓鱼页面骗取这个id。这个钓鱼页面就用获取学籍信息的页面吧。
// 提示：302重定向的url在response头的Location标签内
// 基本思路：截取302跳转，获取跳转前的请求头。配置axios加一个maxRedircts=0就好

module.exports = (query, request) => {
  let { key } = query
  let data = {}
  let cookies = 'SESSION=' + key

  return request({
    method: 'get',
    url: 'http://jxglstu.hfut.edu.cn/eams5-student/for-std/student-info',
    data: data,
    cookies: 'SRVID=s114; ' + cookies,
    redirect: false
  })
}


