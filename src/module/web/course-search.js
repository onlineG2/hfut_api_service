// web版查看选课开放状态

module.exports = (query, request) => {
  let { key, pageCount, dataId, courseCodeLike, courseNameZhLike, courseTypeAssoc, teacherNameLike, nameZhLike, semesterId } = query
  let data = {
    queryPage__: pageCount + ',20',
    courseCodeLike,  // 课程代码
    courseNameZhLike,  // 课程名称
    courseTypeAssoc,  // 课程类型
    teacherNameLike,  // 教师名称
    nameZhLike, // 教学班名称
    semesterId,
  }
  let cookies = 'SRVID=s110; path=/; SESSION=' + key

  return request({
    method: 'get',
    url: 'http://jxglstu.hfut.edu.cn/eams5-student/for-std/lesson-search/semester/' + semesterId + '/search/' + dataId,
    data: data,
    cookies: cookies,
  })
}

