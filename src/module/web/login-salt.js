// 进行web版登录前必须进行的操作。具体逻辑稍有复杂。

module.exports = (query, request) => {
  let data = {}

  return request({
    method: 'get',
    url: 'http://jxglstu.hfut.edu.cn/eams5-student/login-salt',
    data: data,
    cookies: 'SRVID=s110;',
  })
}


