// web版获取专业培养计划

module.exports = (query, request) => {
  let { key } = query

  return request({
    method: 'get',
    url: 'https://webvpn.hfut.edu.cn/http-8080/77726476706e69737468656265737421a2a611d2736526022a5ac7f9/opac/top100_adv.php',
    cookies: 'show_vpn=1; refresh=1; wengine_vpn_ticketwebvpn_hfut_edu_cn=' + key,
  })
}


