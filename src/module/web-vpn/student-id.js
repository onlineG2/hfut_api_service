// 学校web教务采用302重定向的方法获取同学的教务id（在数据中表现为dataId，比如我的id是98911）
// 这里我采取一个钓鱼页面骗取这个id。这个钓鱼页面就用获取学籍信息的页面吧。
// 提示：302重定向的url在response头的Location标签内
// 基本思路：截取302跳转，获取跳转前的请求头。配置axios加一个maxRedircts=0就好

module.exports = (query, request) => {
  let { key } = query
  let data = {}

  return request({
    method: 'get',
    url: 'https://webvpn.hfut.edu.cn/http/77726476706e69737468656265737421faef469034247d1e760e9cb8d6502720ede479/eams5-student/for-std/student-info',
    data: data,
    cookies: 'SRVID=s114; show_vpn=1; refresh=1; wengine_vpn_ticketwebvpn_hfut_edu_cn=' + key,
    redirect: false
  })
}


