// web版查看选课开放状态

module.exports = (query, request) => {
  let { key, pageCount, dataId, courseCodeLike, courseNameZhLike, courseTypeAssoc, teacherNameLike } = query
  let data = {
    queryPage__: pageCount + ',20',
    courseCodeLike,  // 课程代码
    courseNameZhLike,  // 课程名称
    courseTypeAssoc,  // 课程类型
    teacherNameLike,  // 教师名称
  }

  return request({
    method: 'get',
    url: 'https://vpn.hfut.edu.cn/http/77726476706e69737468656265737421faef469034247d1e760e9cb8d6502720ede479/eams5-student/for-std/lesson-search/semester/114/search/' + dataId,
    data: data,
    cookies: 'show_vpn=1; refresh=0; wengine_vpn_ticketvpn_hfut_edu_cn=' + key,
  })
}

