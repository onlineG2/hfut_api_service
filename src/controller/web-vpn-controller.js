const request = require('../util/request-web')
const studentIdModule = require('../module/web-vpn/student-id')
const cheerioModule = require('../util/cheerio-module')
const config = require('../../config/config.default')
const autoSave = require('../util/auto-save')

// 先获取一个wengine_ticket，然后对这个ticket进行验证
// 注:App端只能通过登录获取个人信息
const getVpnTicket = async (ctx) => {
  let generateWengine = require('../module/web-vpn/generate-wengine')
  let vertifyWengine = require('../module/web-vpn/vertify-wengine')
  let ticket = ''
  let wengine = ''
  let error = ''
  await generateWengine(ctx.request.query, request)
    .then(async res => {
      wengine = res.headers['set-cookie'][0].split(';')[0]
      // console.log(wengine)
      await vertifyWengine(ctx.request.query, request, wengine)
        .then(res => {
          if (!res.headers.pragms) {
            ticket = wengine.split('=')[1]
          }
        })
    })
    .catch(err => {
      // console.log('ERR：' + err)
      error = JSON.stringify(err)
    })
  return { ticket, error, wengine }
}
module.exports.vpn_ticket = async (ctx, next) => {
  let { ticket, wengine, error } = await getVpnTicket(ctx)
  if (ticket) {
    return ctx.response.body = {
      success: true,
      msg: 'success',
      key: ticket,
    }
  }
  return ctx.response.body = {
    success: false,
    msg: 'fail',
    wengine: wengine,
    error: error,
    key: ticket,
  }
}

// webvpn式登录
module.exports.login = async (ctx, next) => {
  let { ticket } = await getVpnTicket(ctx)
  console.log('获取ticket：' + ticket)
  let loginSalt = require('../module/web-vpn/login-salt')
  let login = require('../module/web-vpn/login')
  await loginSalt(ticket, request)
    .then(async res => {
      let salt = res.body
      console.log('获取salt：' + salt)
      await login(ctx.request.query, request, ticket, salt)
        .then(async res => {
          if (res.body.result) {
            console.log('登陆正常')
            // console.log(res)
            res.success = true
            res.msg = 'success'
            res.studentId = await getStudentId(res)
            delete res.headers
            delete res.body
            console.log('通行ticket：' + ticket)

            // 执行autoSave
            if (config.autoSave) {
              autoSave(res, ctx.request.query.username, ctx.request.query.password)
            }
            return ctx.response.body = res
          }
          else {
            return ctx.response.body = {
              success: false,
              msg: res.body.message ? res.body.message : 'webvpn登录出错:' + JSON.stringify(res),
              // ticket: ticket,
              // salt: salt,
            }
          }
        })
    })
    .catch(err => ctx.response.body = err)
}

// 获取课表
module.exports.schedule = async (ctx, next) => {
  let question = require('../module/web-vpn/schedule')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
    .then(res => ctx.response.body = res)
    .catch(err => ctx.response.body = err)
}

// 获取成绩列表。返回为html
module.exports.scorelist = async (ctx, next) => {
  let question = require('../module/web-vpn/score-list')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
    .then(res => ctx.response.body = cheerioModule.scorelist(res.body))
    .catch(err => ctx.response.body = err)
}

// 获取选课开放状态
module.exports.course_select = async (ctx, next) => {
  let question = require('../module/web-vpn/course-select')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
    .then(res => ctx.response.body = res)
    .catch(err => ctx.response.body = err)
}

// 考试安排。返回为html
module.exports.exam_arrange = async (ctx, next) => {
  let question = require('../module/web-vpn/exam-arrange')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
    .then(res => ctx.response.body = res)
    .catch(err => ctx.response.body = err)
}

// 获取评教信息
module.exports.lesson_survey = async (ctx, next) => {
  let question = require('../module/web-vpn/lesson-survey')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
    .then(res => ctx.response.body = res)
    .catch(err => ctx.response.body = err)
}

// 获取专业培养计划
module.exports.program = async (ctx, next) => {
  let question = require('../module/web-vpn/program')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
    .then(res => ctx.response.body = res)
    .catch(err => ctx.response.body = err)
}

// 获取个人信息。返回为html
module.exports.selfinfo = async (ctx, next) => {
  let question = require('../module/web-vpn/selfinfo')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
    .then(res => ctx.response.body = cheerioModule.selfinfo(res.body))
    .catch(err => ctx.response.body = err)
}

// 获取studentId（官方命名为dataId）
const getStudentId = async (query) => {
  let studentId = ''
  await studentIdModule(query, request)
    .then(res => {
      studentId = res.body.response.headers.location.split('/')[7]
    }) // 获取了studentId
    .catch(err => console.log(err))
  return studentId
}
