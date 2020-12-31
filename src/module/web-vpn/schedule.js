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
    'vpn-12-o1-jxglstu.hfut.edu.cn': '',
  }

  return request({
    method: 'get',
    url: 'https://webvpn.hfut.edu.cn/http/77726476706e69737468656265737421faef469034247d1e760e9cb8d6502720ede479/eams5-student/for-std/course-table/get-data',
    data: data,
    cookies: 'show_vpn=1; refresh=0; wengine_vpn_ticketwebvpn_hfut_edu_cn=' + key,
  })
}

// https://webvpn.hfut.edu.cn/http/77726476706e69737468656265737421faef469034247d1e760e9cb8d6502720ede479/eams5-student/for-std/course-table/semester/94/print-data/98912?vpn-12-o1-jxglstu.hfut.edu.cn
