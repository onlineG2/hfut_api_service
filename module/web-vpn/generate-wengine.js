// 进行web版登录前必须进行的操作。具体逻辑稍有复杂。

module.exports = (query, request) => {
  let data = {}

  return request({
    method: 'get',
    url: 'https://vpn.hfut.edu.cn/http/77726476706e69737468656265737421f3f652d22f367d44300d8db9d6562d/cas/login?service=https%3A%2F%2Fvpn.hfut.edu.cn%2Flogin%3Fcas_login%3Dtrue',
    data: data,
  })
}


