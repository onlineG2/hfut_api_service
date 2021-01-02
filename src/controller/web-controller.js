const request = require('../util/request-web')
const studentIdModule = require('../module/web/student-id')
const cheerioModule = require('../util/cheerio-module')
const config = require('../../config/config.default')
const autoSave = require('../util/auto-save')

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
            // res.selfinfo = await getSelfInfo(res)
            delete res.headers
            delete res.body
            ctx.response.body = res

            // 执行autoSave
            if (config.autoSave) {
              autoSave(res, ctx.request.query.username, ctx.request.query.password)
            }
          }
          else {
            ctx.response.body = {
              success: false,
              msg: res.body.message
            }
          }
        })
    })
    .catch(err => ctx.response.body = { success: false, err })
}

// 获取课表
module.exports.schedule = async (ctx, next) => {
  let question = require('../module/web/schedule')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
    .then(async scheduleRes => {
      // 检测key是否正常
      if (typeof scheduleRes.body === 'string') {
        return ctx.response.body = {
          success: false,
          msg: 'key失效',
          ...scheduleRes,
        }
      }
      const { timeTableLayoutId } = scheduleRes.body
      if (!timeTableLayoutId) {
        scheduleRes.body = {}
        return ctx.response.body = scheduleRes
      }
      ctx.request.query.timeTableLayoutId = timeTableLayoutId
      let timeTable = require('../module/web/time-table')
      for (let i = 0; i < 20; i++) {
        console.log('timeTable第' + (i + 1) + '次尝试')
        await timeTable(ctx.request.query, request)
          .then(timeTableRes => {
            if (timeTableRes.body.result) {
              i = 20
            }
            scheduleRes.body.courseId2CourseTextbookStat = {}
            ctx.response.body = {
              success: true,
              msg: '正常',
              ...scheduleRes,
              body: {
                ...scheduleRes.body,
                timeTable: {
                  ...timeTableRes.body.result,
                },
              }
            }
          })
      }

    })
    .catch(err => ctx.response.body = { success: false, error: true, msg: err })
}



// 获取成绩列表。返回为html
module.exports.scorelist = async (ctx, next) => {
  let question = require('../module/web/score-list')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
    .then(res => {
      if (res.body.indexOf('登入页面') !== -1) {
        return ctx.response.body = {
          success: false,
          msg: 'key失效',
          scorelist: [],
        }
      } else {
        return ctx.response.body = {
          success: true,
          msg: '成功',
          scorelist: cheerioModule.scorelist(res.body),
        }
      }
    })
    .catch(err => ctx.response.body = err)
}

// 获取个人信息，返回为html
module.exports.selfinfo = async (ctx, next) => {
  ctx.response.body = await getSelfInfo(ctx.request.query)
}

// 获取考试安排  需要html解析
module.exports.exam_arrange = async (ctx, next) => {
  let question = require('../module/web/exam-arrange')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
    .then(res => ctx.response.body = {
      success: true,
      content: cheerioModule.examArrange(res.body),
    })
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

// 获取个人信息
const getSelfInfo = async (query) => {
  let question = require('../module/web/selfinfo')
  let studentId = await getStudentId(query)
  query.dataId = studentId
  const res = await question(query, request)
  return cheerioModule.selfinfo(res.body)
}

// 获取stuid
const getStudentId = async (query) => {
  let studentId = ''
  // console.log(query)
  await studentIdModule(query, request)
    .then(res => {
      // 是预科生
      if (!res.body.response) {
        studentId = cheerioModule.getPreppyStuId(res.body)
      } else {
        // 不是预科生
        studentId = res.body.response.headers.location.split('/')[5]
      }
    })
    .catch((err) => {
      console.log(err)
    })
  return studentId
}


// 课程/教师检索
module.exports.course_search = async (ctx, next) => {
  let question = require('../module/web/course-search')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
    .then(res => {
      if (typeof res.body === 'string') {
        return ctx.response.body = {
          success: false,
          msg: 'key失效',
          data: null,
        }
      } else {
        return ctx.response.body = {
          success: true,
          msg: '成功',
          data: {
            ...res.body,
          },
        }
      }
    })
    .catch(err => ctx.response.body = err)
}
