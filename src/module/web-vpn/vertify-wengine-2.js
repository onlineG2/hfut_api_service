// vpn第二代，走信息门户
const fs = require('fs')
const path = require('path')


module.exports = (request) => {
  let vpnKey = getOneVpnKey()
  let data = {
    username: vpnKey[0],
    password: vpnKey[1],
  }
  
  return request({
    method: 'post',
    url: 'https://webvpn.hfut.edu.cn/do-login',
    data: data,
    contentType: 'application/x-www-form-urlencoded'
  })
}

const getOneVpnKey = () => {
  // let data = fs.readFileSync('../data/vpnKey.csv')
  let data = fs.readFileSync(path.join(__dirname, 'vpnKey.csv'))

  data = data.toString();
  let table = new Array();
  let rows = new Array();
  rows = data.split("\r\n");
  for (var i = 0; i < rows.length; i++) {
    table.push(rows[i].split(","));
  }

  return table[Math.floor(Math.random() * table.length)];
}
