// 进行web版登录前必须进行的操作。具体逻辑稍有复杂。

module.exports = (ticket, request) => {
  let data = {
    'vpn-12-o1-jxglstu.hfut.edu.cn': ''
  }

  return request({
    method: 'get',
    url: 'https://vpn.hfut.edu.cn/http/77726476706e69737468656265737421faef469034247d1e760e9cb8d6502720ede479/eams5-student/login-salt',
    data: data,
    cookies: 'SRVID=s114; remember_token=; show_vpn=1; refresh=1; wengine_vpn_ticketvpn_hfut_edu_cn=' + ticket,
  })
}


