// web版获取课表

module.exports = (query, request) => {
  let { semesterId, dataId, key } = query
  let data = {
    semesterId: semesterId,
    dataId: dataId,
    bizTypeId: '2',
    'vpn-12-o1-jxglstu.hfut.edu.cn': '',
  }

  return request({
    method: 'get',
    url: 'https://vpn.hfut.edu.cn/http/77726476706e69737468656265737421faef469034247d1e760e9cb8d6502720ede479/eams5-student/for-std/course-table/get-data',
    data: data,
    cookies: 'show_vpn=1; refresh=1; wengine_vpn_ticketvpn_hfut_edu_cn=' + key,
  })
}


