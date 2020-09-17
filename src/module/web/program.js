// web版获取专业培养计划

module.exports = (query, request) => {
  let { dataId, key } = query
  let data = {}
  let cookies = 'SESSION=' + key

  return request({
    method: 'get',
    url: 'http://jxglstu.hfut.edu.cn/eams5-student/for-std/program/root-module-json/' + dataId,
    data: data,
    cookies: cookies,
  })
}


