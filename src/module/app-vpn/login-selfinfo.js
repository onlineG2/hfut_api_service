// 登录、获取个人信息

module.exports = (query, request) => {
  let { username, password, vpnTicket } = query
  password = password ? password : ''
  let data = {
    username: username,
    password: Buffer.from(password).toString('base64'),
    identity: '0'
  }
  return request({
    method: 'post',
    url: 'https://webvpn.hfut.edu.cn/http/77726476706e69737468656265737421faef469034247d1e760e9cb8d6502720ede4792c7ce9797e/appservice/home/appLogin/login.action',
    data,
    cookies: 'show_vpn=1; refresh=1; wengine_vpn_ticketwebvpn_hfut_edu_cn=' + vpnTicket,
  })
}


