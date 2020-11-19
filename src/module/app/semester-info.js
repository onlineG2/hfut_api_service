// 获取学期信息列表

module.exports = (query, request) => {
  let { key, userKey } = query
  key = userKey ? userKey : key
  let data = {
    userKey: key,
    projectId: '2'
  }
  return request({
    method: 'post',
    url: 'http://jxglstu.hfut.edu.cn:7070/appservice/home/publicdata/getSemesterAndWeekList.action',
    data
  })
}


