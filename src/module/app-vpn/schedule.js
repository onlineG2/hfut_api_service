// 获取某一周的课表
// 注：weekIndex不填的话返回整个学期的课

module.exports = (query, request) => {
  let { key, semestercode, weekIndex, userKey, vpnTicket } = query
  key = userKey ? userKey : key
  let data = {
    userKey: key,
    semestercode: semestercode,
    weekIndx: weekIndex,
    projectId: '2',
    identity: '0'
  }
  return request({
    method: 'post',
    url: 'https://vpn.hfut.edu.cn/http/77726476706e69737468656265737421faef469034247d1e760e9cb8d6502720ede4792c7ce9797e/appservice/home/schedule/getWeekSchedule.action',
    data,
    cookies: 'show_vpn=1; refresh=1; wengine_vpn_ticketvpn_hfut_edu_cn=' + vpnTicket,
  })
}


