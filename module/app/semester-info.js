// 获取学期信息列表

module.exports = (query, request) => {
  let { key } = query
  let data = {
    userKey: key,
    projectId: '2'
  }
  return request(
    'post', 'http://jxglstu.hfut.edu.cn:7070/appservice/home/publicdata/getSemesterAndWeekList.action', data
  )
}


