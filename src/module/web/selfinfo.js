// web版获取个人信息

module.exports = (query, request) => {
  let { key, dataId } = query
  let data = {}
  let cookies = 'SESSION=' + key

  return request({
    method: 'get',
    url: 'http://jxglstu.hfut.edu.cn/eams5-student/for-std/student-info/info/' + dataId,
    data: data,
    cookies: 'SRVID=s114; ' + cookies,
  })
}







