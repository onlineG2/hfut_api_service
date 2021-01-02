// 获取当天事件

module.exports = (query, request) => {
  let { key, userKey } = query
  key = userKey ? userKey : key
  let data = {
    userKey: key,
  }
  return request({
    method: 'post',
    url: 'http://jxglstu.hfut.edu.cn:7070/appservice/home/event/getEvent.action',
    data
  })
}


