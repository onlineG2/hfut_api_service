// web版获取评教信息
const basicInfo = require('../../app').basicInfo

module.exports = (query, request) => {
  let { key, dataId } = query
  let data = {}
  let cookies = 'SESSION=' + key
  let semesterId = basicInfo.currentWebSemesterId

  return request({
    method: 'get',
    url: `http://jxglstu.hfut.edu.cn/eams5-student/for-std/lesson-survey/${semesterId}/search/${dataId}`,
    data: data,
    cookies: cookies,
  })
}







