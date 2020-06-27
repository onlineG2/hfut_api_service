// 登录、获取个人信息

module.exports = (query, request) => {
  let { username, password } = query
  password = password ? password : ''
  let data = {
    username: username,
    password: Buffer.from(password).toString('base64'),
    identity: '0'
  }
  return request(
    'post', 'http://jxglstu.hfut.edu.cn:7070/appservice/home/appLogin/login.action', data
  )
}


