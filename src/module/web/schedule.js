// web版获取课表

module.exports = (query, request) => {
  let { semesterId, dataId, key, campus } = query
  let bizTypeId = '2'
  if (String(campus) === '2') {
    bizTypeId = '23'
  }
  let data = {
    semesterId: semesterId,
    dataId: dataId,
    bizTypeId,
  }
  let cookies = 'SESSION=' + key

  return request({
    method: 'get',
    url: 'http://jxglstu.hfut.edu.cn/eams5-student/for-std/course-table/get-data',
    data: data,
    cookies: cookies,
  })
}

// http://jxglstu.hfut.edu.cn/eams5-student/for-std/course-table/semester/94/print-data/98912?vpn-12-o1-jxglstu.hfut.edu.cn
