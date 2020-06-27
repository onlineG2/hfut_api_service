const request = require('../util/request-app')


// 登录 and 返回个人信息
// 注:App端只能通过登录获取个人信息
module.exports.login = async (ctx, next) => {
  let question = require('../module/app/login-selfinfo')
  await question(ctx.request.query, request)
  .then(res => {
    res.key = res.body.obj.userKey
    res.selfinfo = res.body.obj.business_data
    delete res.headers
    delete res.body
    ctx.response.body = res
  })
  .catch(err => ctx.response.body = err)
}

// 获取成绩列表
module.exports.scorelist = async (ctx, next) => {
  let question = require('../module/app/score-list')
  await question(ctx.request.query, request)
  .then(res => ctx.response.body = res)
  .catch(err => ctx.response.body = err)
}

// 获取当天事件
module.exports.event = async (ctx, next) => {
  let question = require('../module/app/event')
  await question(ctx.request.query, request)
  .then(res => ctx.response.body = res)
  .catch(err => ctx.response.body = err)
}

// 获取某门课同学列表
module.exports.classlist = async (ctx, next) => {
  let question = require('../module/app/class-list')
  await question(ctx.request.query, request)
  .then(res => ctx.response.body = res)
  .catch(err => ctx.response.body = err)
}

// 获取课表
module.exports.schedule = async (ctx, next) => {
  let question = require('../module/app/schedule')
  await question(ctx.request.query, request)
  .then(res => ctx.response.body = res)
  .catch(err => ctx.response.body = err)
}

// 获取考试安排
module.exports.exam_arrange = async (ctx, next) => {
  let question = require('../module/app/exam-arrange')
  await question(ctx.request.query, request)
  .then(res => ctx.response.body = res)
  .catch(err => ctx.response.body = err)
}

// 获取学期信息
module.exports.semesterinfo = async (ctx, next) => {
  let question = require('../module/app/semester-info')
  await question(ctx.request.query, request)
  .then(res => ctx.response.body = res)
  .catch(err => ctx.response.body = err)
}




