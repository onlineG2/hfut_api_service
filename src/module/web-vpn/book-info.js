// web版获取专业培养计划

module.exports = (query, request) => {
  let { key, bno } = query
  let data = {
    "marc_no": bno
  }

  return request({
    method: 'get',
    url: 'https://webvpn.hfut.edu.cn/http-8080/77726476706e69737468656265737421a2a611d2736526022a5ac7f9/opac/item.php',
    data: data,
    cookies: 'show_vpn=1; refresh=1; wengine_vpn_ticketwebvpn_hfut_edu_cn=' + key,
  })
}


