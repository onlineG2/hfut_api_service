// 获取某一周的课表
// 注：weekIndex不填的话返回整个学期的课

module.exports = (query, request) => {
  let { key, semestercode, weekIndex, userKey } = query
  key = userKey ? userKey : key
  let data = {
    userKey: key,
    semestercode: semestercode,
    weekIndx: weekIndex,
    projectId: '2',
    identity: '0'
  }
  return request(
    'post', 'http://jxglstu.hfut.edu.cn:7070/appservice/home/schedule/getWeekSchedule.action', data
  )
}


