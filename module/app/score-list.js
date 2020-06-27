// 获取某个学期的成绩列表

module.exports = (query, request) => {
  let { key, semestercode } = query
  let data = {
    userKey: key,
    semestercode: semestercode,
    projectId: '2',
    identity: '0'
  }
  return request(
    'post', 'http://jxglstu.hfut.edu.cn:7070/appservice/home/course/getSemesterScoreList.action', data
  )
}


