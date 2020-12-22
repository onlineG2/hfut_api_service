// 获取某个教学班的同学列表

module.exports = (query, request) => {
  let { key, campus, lessonCode, semestercode, userKey, vpnTicket } = query
  key = userKey ? userKey : key
  let bizTypeId = '2'
  if (String(campus) === '2') {
    bizTypeId = '23'
  }

  let data = {
    userKey: key,
    lessonCode: lessonCode,
    semestercode: semestercode,
    projectId: bizTypeId,
  }

  return request({
    method: 'post', 
    url: 'https://vpn.hfut.edu.cn/http/77726476706e69737468656265737421faef469034247d1e760e9cb8d6502720ede4792c7ce9797e/appservice/home/schedule/getClassList.action', 
    data,
    cookies: 'show_vpn=1; refresh=1; wengine_vpn_ticketvpn_hfut_edu_cn=' + vpnTicket,
  })
}


