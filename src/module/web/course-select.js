// web版查看选课开放状态

module.exports = (query, request) => {
  let { key, dataId } = query
  let data = {
    studentId: dataId,
    bizTypeId: '2'
  }
  let cookies = 'SESSION=' + key

  return request({
    method: 'post',
    url: 'http://jxglstu.hfut.edu.cn/eams5-student/ws/for-std/course-select/open-turns',
    data: data,
    cookies: cookies,
    contentType: 'application/x-www-form-urlencoded'
  })
}







