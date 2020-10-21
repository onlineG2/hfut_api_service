// web版查看选课开放状态

module.exports = (query, request) => {
  let { key, timeTableLayoutId } = query
  let data = {
    timeTableLayoutId
  }
  let cookies = 'SESSION=' + key

  return request({
    method: 'post',
    url: 'http://jxglstu.hfut.edu.cn/eams5-student/ws/schedule-table/timetable-layout',
    data: data,
    cookies: cookies,
    // contentType: 'application/x-www-form-urlencoded'
  })
}







