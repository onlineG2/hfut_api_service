// web版获取专业培养计划

module.exports = (query, request) => {
  let { bno } = query
  let data = {
    "marc_no": bno
  }

  return request({
    method: 'get',
    url: 'http://opac.hfut.edu.cn:8080/opac/ajax_item.php',
    data: data,
  })
}


