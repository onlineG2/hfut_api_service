// web版查看选课开放状态

module.exports = (query, request) => {
  let { key, keyword, pageCount } = query
  let data = {
    "searchWords": [
      {
        "fieldList": [
          {
            "fieldCode": "",
            "fieldValue": keyword
          }
        ]
      }
    ],
    "filters": [],
    "limiter": [],
    "sortField": "relevance",
    "sortType": "desc",
    "pageSize": 20,
    "pageCount": pageCount,
    "locale": "zh_CN",
    "first": true
  }

  return request({
    method: 'post',
    url: 'https://webvpn.hfut.edu.cn/http-8080/77726476706e69737468656265737421a2a611d2736526022a5ac7f9/opac/ajax_search_adv.php',
    data: data,
    cookies: 'show_vpn=1; refresh=1; wengine_vpn_ticketwebvpn_hfut_edu_cn=' + key,
  })
}







