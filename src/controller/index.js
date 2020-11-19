const appController = require('./app-controller')
const webController = require('./web-controller')
const webVpnController = require('./web-vpn-controller')
const appVpnController = require('./app-vpn-controller')
const config = require('../../config/config.default')

// 登录获取key，支持app和web
module.exports.login = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      if (config.emergency) {
        await webVpnController.login(ctx, next); break;
      }
      await webController.login(ctx, next); break;

    case 'webvpn':
      await webVpnController.login(ctx, next); break;
    case 'appvpn':
      await appVpnController.login(ctx, next); break;
    default:
      await appController.login(ctx, next);
  }
}

// 获取课表，支持app和web
module.exports.schedule = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      if (config.emergency) {
        await webVpnController.schedule(ctx, next); break;
      }
      await webController.schedule(ctx, next); break;

    case 'webvpn':
      await webVpnController.schedule(ctx, next); break;
    case 'appvpn':
      await appVpnController.schedule(ctx, next); break;
    default:
      await appController.schedule(ctx, next);
  }
}

// 获取考试安排，支持app和web
module.exports.exam_arrange = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      if (config.emergency) {
        await webVpnController.exam_arrange(ctx, next); break;
      }
      await webController.exam_arrange(ctx, next); break;

    case 'webvpn':
      await webVpnController.exam_arrange(ctx, next); break;
    case 'appvpn':
      await appVpnController.exam_arrange(ctx, next); break;
    default:
      await appController.exam_arrange(ctx, next);
  }
}

// 获取成绩列表，支持app和web
module.exports.scorelist = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      if (config.emergency) {
        await webVpnController.scorelist(ctx, next); break;
      }
      await webController.scorelist(ctx, next); break;
      
    case 'webvpn':
      await webVpnController.scorelist(ctx, next); break;
    case 'appvpn':
      await appVpnController.scorelist(ctx, next); break;
    default:
      await appController.scorelist(ctx, next);
  }
}

// 全校开课检索，仅web
module.exports.course_search = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      if (config.emergency) {
        await webVpnController.course_search(ctx, next); break;
      }
      await webController.course_search(ctx, next); break;
      
    case 'webvpn':
      await webVpnController.course_search(ctx, next); break;
    default:
      await webController.course_search(ctx, next);
  }
}

// 以上vpn紧急模式要改


// 以下为仅app
// 当日事件，仅app
module.exports.event = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'appvpn':
      await appVpnController.event(ctx, next); break;
    default:
      await appController.event(ctx, next);
  }
}

// 班级同学列表，仅app
module.exports.classlist = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'appvpn':
      await appVpnController.classlist(ctx, next); break;
    default:
      await appController.classlist(ctx, next);
  }
}

// 学期信息，仅app
module.exports.semesterinfo = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'appvpn':
      await appVpnController.semesterinfo(ctx, next); break;
    default:
      await appController.semesterinfo(ctx, next);
  }
}

// 以下为仅web
// 获取个人信息
module.exports.selfinfo = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'webvpn':
      await webVpnController.selfinfo(ctx, next); break;
    default:
      await webController.selfinfo(ctx, next); break;
  }
}

// 获取专业培养计划
module.exports.program = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'webvpn':
      await webVpnController.program(ctx, next); break;
    default:
      await webController.program(ctx, next);
  }
}

// 获取评教信息
module.exports.lesson_survey = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'webvpn':
      await webVpnController.lesson_survey(ctx, next); break;
    default:
      await webController.lesson_survey(ctx, next);
  }
}

// 获取选课状态
module.exports.course_select = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'webvpn':
      await webVpnController.course_select(ctx, next); break;
    default:
      await webController.course_select(ctx, next);
  }
}


// 获取一张vpn ticket
module.exports.vpn_ticket = async (ctx, next) => {
  await webVpnController.vpn_ticket(ctx, next);
}


// 图书借阅部分
module.exports.book_search = async (ctx, next) => {
  await webVpnController.book_search(ctx, next);
}

module.exports.book_status = async (ctx, next) => {
  await webVpnController.book_status(ctx, next);
}

module.exports.book_info = async (ctx, next) => {
  await webVpnController.book_info(ctx, next);
}

module.exports.book_ranking = async (ctx, next) => {
  await webVpnController.book_ranking(ctx, next);
}


