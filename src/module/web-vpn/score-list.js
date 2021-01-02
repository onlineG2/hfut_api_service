// web版获取成绩

module.exports = (query, request) => {
  let { semesterId, key, dataId } = query
  semesterId = semesterId ? semesterId : ''
  let data = {
    semester: semesterId,
    'vpn-12-o1-jxglstu.hfut.edu.cn': '',
  }

  return request({
    method: 'get',
    url: 'https://webvpn.hfut.edu.cn/http/77726476706e69737468656265737421faef469034247d1e760e9cb8d6502720ede479/eams5-student/for-std/grade/sheet/info/' + dataId,
    data: data,
    cookies: 'show_vpn=1; refresh=1; wengine_vpn_ticketwebvpn_hfut_edu_cn=' + key,
  })
}
