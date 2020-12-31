// 获取某个学期的考试安排

module.exports = (query, request) => {
  let { key, semestercode, userKey, vpnTicket } = query
  key = userKey ? userKey : key
  let data = {
    userKey: key,
    semestercode: semestercode,
    projectId: '2',
    identity: '0'
  }
  return request({
    method: 'post',
    url: 'https://webvpn.hfut.edu.cn/http/77726476706e69737468656265737421faef469034247d1e760e9cb8d6502720ede4792c7ce9797e/appservice/home/course/getExamArrangement.action',
    data,
    cookies: 'show_vpn=1; refresh=1; wengine_vpn_ticketwebvpn_hfut_edu_cn=' + vpnTicket,
  })
}


