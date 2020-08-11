// web版登录
const CryptoJS = require("crypto-js");

module.exports = (query, request, cookies, salt) => {
  let { username, password } = query
  password = password ? password : ''
  let data = {
    username: username,
    password: new String(CryptoJS.SHA1(salt + '-' + password)) + "",
    // password: password,
    captcha: ''
  }
  
  return request({
    method: 'post',
    url: 'http://jxglstu.hfut.edu.cn/eams5-student/login',
    data: data,
    cookies: cookies,
  })
}


