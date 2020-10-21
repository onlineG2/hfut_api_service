// web版查看选课开放状态

module.exports = (query, request) => {
  let { key, timeTableLayoutId } = query
  let data = {
    timeTableLayoutId
  }

  return request({
    method: 'post',
    url: 'https://vpn.hfut.edu.cn/http/77726476706e69737468656265737421faef469034247d1e760e9cb8d6502720ede479/eams5-student/ws/schedule-table/timetable-layout',
    data: data,
    cookies: 'SRVID=s110; show_vpn=1; refresh=1; wengine_vpn_ticketvpn_hfut_edu_cn=' + key,
    // contentType: 'application/x-www-form-urlencoded'
  })
}







