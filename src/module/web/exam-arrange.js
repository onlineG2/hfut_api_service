// web版获取考试信息
// 返回的是html,需要解析

module.exports = (query, request) => {
  let { key, dataId } = query
  let data = {}
  let cookies = 'SESSION=' + key

  return request({
    method: 'get',
    url: 'http://jxglstu.hfut.edu.cn/eams5-student/for-std/exam-arrange/info/' + dataId,
    data: data,
    cookies: 'SRVID=s114; ' + cookies,
  })
}







