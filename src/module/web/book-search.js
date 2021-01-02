// web版查看选课开放状态

module.exports = (query, request) => {
  let { keyword, pageCount } = query
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
    url: 'http://opac.hfut.edu.cn:8080/opac/ajax_search_adv.php',
    data: data,
    contentType: ''
  })
}







