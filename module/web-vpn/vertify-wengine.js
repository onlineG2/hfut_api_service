// web版获取个人信息
const strEnc = require('../../util/enc-CAS')
const fs = require('fs')


module.exports = (query, request, wengine) => {
  let vpnKey = getOneVpnKey()
  let data = {
    rsa: strEnc(vpnKey[0] + vpnKey[1] + 'LT-2765-O6Gf5i6lbGtfAuqaJebe9iDVMQKaeb-cas', '1', '2', '3'),
    lt: 'LT-2765-O6Gf5i6lbGtfAuqaJebe9iDVMQKaeb-cas',
    ul: '10',
    pl: '6',
    execution: 'e1s1',
    _eventId: 'submit',
  }

  return request({
    method: 'post',
    url: 'https://vpn.hfut.edu.cn/http/77726476706e69737468656265737421f3f652d22f367d44300d8db9d6562d/cas/login?service=https%3A%2F%2Fvpn.hfut.edu.cn%2Flogin%3Fcas_login%3Dtrue',
    data: data,
    // cookies: wengine,
    cookies: 'show_vpn=1; refresh=1; ' + wengine,
    contentType: 'application/x-www-form-urlencoded'
  })
}

// 返回一对key
// 这里的路径可能会出错
const getOneVpnKey = () => {
  let data = fs.readFileSync('../data/vpnKey.csv')

  data = data.toString();
  let table = new Array();
  let rows = new Array();
  rows = data.split("\r\n");
  for (var i = 0; i < rows.length; i++) {
    table.push(rows[i].split(","));
  }

  return table[Math.floor(Math.random() * table.length)];
}








