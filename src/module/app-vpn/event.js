// 获取当天事件

module.exports = (query, request) => {
  let { key, userKey, vpnTicket } = query
  key = userKey ? userKey : key
  let data = {
    userKey: key,
  }
  return request({
    method: 'post',
    url: 'https://webvpn.hfut.edu.cn/http/77726476706e69737468656265737421faef469034247d1e760e9cb8d6502720ede4792c7ce9797e/appservice/home/event/getEvent.action',
    data,
    cookies: 'show_vpn=1; refresh=1; wengine_vpn_ticketwebvpn_hfut_edu_cn=' + vpnTicket,
  })
}


