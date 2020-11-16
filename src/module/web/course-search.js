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
  let cookies = 'SESSION=' + key

  return request({
    method: 'get',
    url: 'http://jxglstu.hfut.edu.cn/eams5-student/for-std/lesson-search/semester/114/search/' + dataId,
    data: data,
    cookies: cookies,
  })
}

