// 获取某个学期的考试安排

module.exports = (query, request) => {
  let { key, semestercode } = query
  let data = {
    userKey: key,
    semestercode: semestercode,
    projectId: '2',
    identity: '0'
  }
  return request(
    'get', 'http://jxglstu.hfut.edu.cn:7070/appservice/home/course/getExamArrangement.action', data
  )
}


