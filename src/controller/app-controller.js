const request = require('../util/request-app')
const config = require('../../config/config.default')
const autoSave = require('../util/auto-save')

// 登录 and 返回个人信息
// 注:App端只能通过登录获取个人信息
module.exports.login = async (ctx, next) => {
  let question = require('../module/app/login-selfinfo')
  await question(ctx.request.query, request)
  .then(res => {
    if (res.body.obj) {
      res.success = true
      res.msg = 'success'
      res.key = res.body.obj.userKey
      res.selfinfo = res.body.obj.business_data
      res.selfinfo.user_key = res.body.obj.userKey
      delete res.headers
      delete res.body
      delete res.status
      ctx.response.body = res

      // 执行autoSave
      if (config.autoSave) {
        autoSave(res.selfinfo, ctx.request.query.username, ctx.request.query.password)
      }
    }
    else {
      ctx.response.body = {
        success: false,
        msg: res.body.error
      }
    }
  })
  .catch(err => {
    console.log('ERR：' + err)
    ctx.response.body = err
  })
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

