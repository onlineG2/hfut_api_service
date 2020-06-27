// 获取当天事件

module.exports = (query, request) => {
  let { key } = query
  let data = {
    userKey: key,
  }
  return request(
    'post', 'http://jxglstu.hfut.edu.cn:7070/appservice/home/event/getEvent.action', data
  )
}


