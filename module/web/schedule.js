// web版获取课表

module.exports = (query, request) => {
  let { semesterId, dataId, key } = query
  let data = {
    semesterId: semesterId,
    dataId: dataId,
    bizTypeId: '2'
  }
  let cookies = 'SESSION=' + key

  return request({
    method: 'get',
    url: 'http://jxglstu.hfut.edu.cn/eams5-student/for-std/course-table/get-data',
    data: data,
    cookies: cookies,
  })
}


