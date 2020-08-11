const request = require('../util/request-web')
const studentIdModule = require('../module/web/student-id')
const cheerioModule = require('../util/cheerio-module')


const getStudentId = async (query) => {
  let studentId = ''
  await studentIdModule(query, request)
  .then(res => {
    console.log(res.body.response.headers)
    studentId = res.body.response.headers.location.split('/')[5]
  }) // 获取了studentId
  .catch(err => console.log(err))
  return studentId
}

// 登录比较麻烦，先login-salt再login
module.exports.login = async (ctx, next) => {
  let loginSalt = require('../module/web/login-salt')
  let login = require('../module/web/login')
  await loginSalt({}, request)
  .then(async res => {
    let salt = res.body
    await login(ctx.request.query, request, res.headers['set-cookie'][0], salt)
    .then(async res => {
      if (res.body.result) {
        res.success = true
        res.msg = 'success'
        res.studentId = await getStudentId(res)
        delete res.headers
        delete res.body
        ctx.response.body = res
      }
      else {
        console.log('请求失败！')
        console.log(res)
        ctx.response.body = {
          success: false,
          msg: res.body.message
        }
      }
    })
  })
  .catch(err => ctx.response.body = err)
}

// 获取课表
module.exports.schedule = async (ctx, next) => {
  let question = require('../module/web/schedule')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
  .then(res => ctx.response.body = res)
  .catch(err => ctx.response.body = err)
}

// 获取成绩列表。返回为html
module.exports.scorelist = async (ctx, next) => {
  let question = require('../module/web/score-list')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
  .then(res => ctx.response.body = cheerioModule.scorelist(res.body))
  .catch(err => ctx.response.body = err)
}

// 获取个人信息，返回为html
module.exports.selfinfo = async (ctx, next) => {
  let question = require('../module/web/selfinfo')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
  .then(res => ctx.response.body = cheerioModule.selfinfo(res.body))
  .catch(err => ctx.response.body = err)
}

// 获取考试安排  需要html解析
module.exports.exam_arrange = async (ctx, next) => {
  let question = require('../module/web/exam-arrange')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
  .then(res => ctx.response.body = res)
  .catch(err => ctx.response.body = err)
}

// 获取本专业培养计划
module.exports.program = async (ctx, next) => {
  let question = require('../module/web/program')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
  .then(res => ctx.response.body = res)
  .catch(err => ctx.response.body = err)
}

// 获取评教信息
module.exports.lesson_survey = async (ctx, next) => {
  let question = require('../module/web/lesson-survey')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
  .then(res => ctx.response.body = res)
  .catch(err => ctx.response.body = err)
}

// 获取选课开放状态
module.exports.course_select = async (ctx, next) => {
  let question = require('../module/web/course-select')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
  .then(res => ctx.response.body = res)
  .catch(err => ctx.response.body = err)
}


