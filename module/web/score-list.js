// web版获取成绩

module.exports = (query, request) => {
  let { semesterId, key, dataId } = query
  semesterId = semesterId ? semesterId : ''
  let data = {
    semester: semesterId,
  }
  let cookies = 'SESSION=' + key

  return request({
    method: 'get',
    url: 'http://jxglstu.hfut.edu.cn/eams5-student/for-std/grade/sheet/info/' + dataId,
    data: data,
    cookies: cookies,
  })
}







