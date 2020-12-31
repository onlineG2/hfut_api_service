// web版查看选课开放状态

module.exports = (query, request) => {
  let { key, dataId } = query
  let data = {
    studentId: dataId,
    bizTypeId: '2'
  }

  return request({
    method: 'post',
    url: 'https://webvpn.hfut.edu.cn/http/77726476706e69737468656265737421faef469034247d1e760e9cb8d6502720ede479/eams5-student/ws/for-std/course-select/open-turns?vpn-12-o1-jxglstu.hfut.edu.cn',
    data: data,
    cookies: 'show_vpn=1; refresh=1; wengine_vpn_ticketwebvpn_hfut_edu_cn=' + key,
    contentType: 'application/x-www-form-urlencoded'
  })
}







