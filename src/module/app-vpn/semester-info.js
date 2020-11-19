// 获取学期信息列表

module.exports = (query, request) => {
  let { key, userKey, vpnTicket } = query
  key = userKey ? userKey : key
  let data = {
    userKey: key,
    projectId: '2'
  }
  return request({
    method: 'post',
    url: 'https://vpn.hfut.edu.cn/http/77726476706e69737468656265737421faef469034247d1e760e9cb8d6502720ede4792c7ce9797e/appservice/home/publicdata/getSemesterAndWeekList.action',
    data,
    cookies: 'show_vpn=1; refresh=1; wengine_vpn_ticketvpn_hfut_edu_cn=' + vpnTicket,
  })
}


