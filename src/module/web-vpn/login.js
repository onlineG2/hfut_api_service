// web版登录
const CryptoJS = require("crypto-js");

module.exports = (query, request, ticket, salt) => {
  let { username, password } = query
  password = password ? password : ''
  let data = {
    username: username,
    password: new String(CryptoJS.SHA1(salt + '-' + password)) + "",
    captcha: ''
  }
  
  return request({
    method: 'post',
    url: 'https://webvpn.hfut.edu.cn/http/77726476706e69737468656265737421faef469034247d1e760e9cb8d6502720ede479/eams5-student/login',
    data: data,
    cookies: 'SRVID=s114; wengine_vpn_ticketwebvpn_hfut_edu_cn=' + ticket,
  })
}


