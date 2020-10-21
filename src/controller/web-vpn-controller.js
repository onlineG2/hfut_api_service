const request = require('../util/request-web')
const studentIdModule = require('../module/web-vpn/student-id')
const cheerioModule = require('../util/cheerio-module')
const config = require('../../config/config.default')
const autoSave = require('../util/auto-save')

// 先获取一个wengine_ticket，然后对这个ticket进行验证
// 注:App端只能通过登录获取个人信息
// const getVpnTicket = async (ctx) => {
//   let generateWengine = require('../module/web-vpn/generate-wengine')
//   let vertifyWengine = require('../module/web-vpn/vertify-wengine')
//   let ticket = ''
//   let wengine = ''
//   let error = ''
//   await generateWengine(ctx.request.query, request)
//     .then(async res => {
//       wengine = res.headers['set-cookie'][0].split(';')[0]
//       // console.log(wengine)
//       await vertifyWengine(ctx.request.query, request, wengine)
//         .then(res => {
//           if (!res.headers.pragms) {
//             ticket = wengine.split('=')[1]
//           }
//         })
//     })
//     .catch(err => {
//       // console.log('ERR：' + err)
//       error = JSON.stringify(err)
//     })
//   return { ticket, error, wengine }
// }

const getVpnTicket = async (ctx) => {
  let vertifyWengine = require('../module/web-vpn/vertify-wengine-2')
  let ticket = ''
  let wengine = ''
  let error = ''
  await vertifyWengine(request)
    .then(res => {
      // console.log(res.headers['set-cookie'][0].split('=')[1])
      if (res.headers['set-cookie']) {
        ticket = res.headers['set-cookie'][0].split('=')[1].split(';')[0]
        // console.log(ticket)
      }
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
  let loginSalt = require('../module/web-vpn/login-salt')
  let login = require('../module/web-vpn/login')

  for (let i = 0; i < 20; i++) {
    let { ticket } = await getVpnTicket(ctx)
    console.log('获取ticket：' + ticket)
    console.log('vpn-login-salt第' + (i + 1) + '次尝试')
    await loginSalt(ticket, request)
      .then(async res => {
        let salt = res.body
        let saltStatus = res.status
        if (saltStatus === 200) {
          i = 20
          console.log('获取salt：' + salt)
          await login(ctx.request.query, request, ticket, salt)
            .then(async res => {
              if (res.body.result) {
                res.success = true
                res.msg = 'success'
                res.studentId = await getStudentId(res)
                delete res.headers
                delete res.body
                console.log('vpn登陆正常，通行ticket：' + ticket)

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
                }
              }
            })
        } else {
          return ctx.response.body = {
            success: false,
            msg: 'vpn-login-salt获取失败',
          }
        }

      })
      .catch(err => ctx.response.body = err)
  }

}

// 获取课表
module.exports.schedule = async (ctx, next) => {
  let question = require('../module/web-vpn/schedule')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
    .then(async scheduleRes => {
      const { timeTableLayoutId } = scheduleRes.body
      if (!timeTableLayoutId) {
        scheduleRes.body = {}
        return ctx.response.body = scheduleRes
      }
      ctx.request.query.timeTableLayoutId = timeTableLayoutId
      let timeTable = require('../module/web-vpn/time-table')
      await timeTable(ctx.request.query, request)
        .then(timeTableRes => {
          scheduleRes.body.courseId2CourseTextbookStat = {}
          ctx.response.body = {
            ...scheduleRes,
            body: {
              ...scheduleRes.body,
              timeTable: {
                ...timeTableRes.body.result,
              },
            }
          }
        })
    })
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

// 获取考试安排  需要html解析
module.exports.exam_arrange = async (ctx, next) => {
  let question = require('../module/web-vpn/exam-arrange')
  let studentId = await getStudentId(ctx.request.query)
  ctx.request.query.dataId = studentId
  await question(ctx.request.query, request)
    .then(res => ctx.response.body = {
      success: true,
      content: cheerioModule.examArrange(res.body),
    })
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
  ctx.response.body = await getSelfInfo(ctx.request.query)
}


// 获取个人信息
const getSelfInfo = async (query) => {
  let question = require('../module/web-vpn/selfinfo')
  let studentId = await getStudentId(query)
  query.dataId = studentId
  const res = await question(query, request)
  return cheerioModule.selfinfo(res.body)
}

// 获取studentId（官方命名为dataId）
// 获取stuid
const getStudentId = async (query) => {
  let studentId = ''
  await studentIdModule(query, request)
    .then(res => {
      // 是预科生
      if (!res.body.response) {
        studentId = cheerioModule.getPreppyStuId(res.body)
      } else {
        // 不是预科生
        const splitByLine = res.body.response.headers.location.split('/')
        studentId = splitByLine[splitByLine.length - 1]
      }
    })
    .catch((err) => {
      console.log(err)
    })
  return studentId
}



// 图书馆馆藏检索
module.exports.book_search = async (ctx, next) => {
  let question = require('../module/web-vpn/book-search')
  await question(ctx.request.query, request)
    .then(res => {
      const { status, body: { total, content } } = res
      ctx.response.body = {
        status,
        success: true,
        total,
        pageCount: parseInt(ctx.request.query.pageCount),
        content,
      }
    })
    .catch(err => ctx.response.body = err)
}

// 某个图书的借阅状态，需要html解析
module.exports.book_status = async (ctx, next) => {
  let question = require('../module/web-vpn/book-status')
  await question(ctx.request.query, request)
    .then(res => ctx.response.body = cheerioModule.bookStatus(res.body))
    .catch(err => ctx.response.body = err)
}
