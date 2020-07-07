// 获取某个教学班的同学列表

module.exports = (query, request) => {
  let { key, lessonCode, semestercode, userKey } = query
  key = userKey ? userKey : key
  let data = {
    userKey: key,
    lessonCode: lessonCode,
    semestercode: semestercode,
    projectId: '2'
  }
  return request(
    'post', 'http://jxglstu.hfut.edu.cn:7070/appservice/home/schedule/getClassList.action', data
  )
}


