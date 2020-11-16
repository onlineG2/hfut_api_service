const appController = require('./app-controller')
const webController = require('./web-controller')
const webVpnController = require('./web-vpn-controller')


module.exports.login = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      // await webController.login(ctx, next); break;
      await webVpnController.login(ctx, next); break;
    case 'webvpn':
      await webVpnController.login(ctx, next); break;
    default:
      await appController.login(ctx, next);
  }
}

module.exports.schedule = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      // await webController.schedule(ctx, next); break;
      await webVpnController.schedule(ctx, next); break;
    case 'webvpn':
      await webVpnController.schedule(ctx, next); break;
    default:
      await appController.schedule(ctx, next);
  }
}

module.exports.exam_arrange = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      // await webController.exam_arrange(ctx, next); break;
      await webVpnController.exam_arrange(ctx, next); break;
    case 'webvpn':
      await webVpnController.exam_arrange(ctx, next); break;
    default:
      await appController.exam_arrange(ctx, next);
  }
}

module.exports.scorelist = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      // await webController.scorelist(ctx, next); break;
      await webVpnController.scorelist(ctx, next); break;
    case 'webvpn':
      await webVpnController.scorelist(ctx, next); break;
    default:
      await appController.scorelist(ctx, next);
  }
}

module.exports.course_search = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      // await webController.course_search(ctx, next); break;
      await webVpnController.course_search(ctx, next); break;
    case 'webvpn':
      await webVpnController.course_search(ctx, next); break;
    default:
      await webController.course_search(ctx, next);
  }
}


// 以上vpn紧急模式要改


module.exports.event = async (ctx, next) => {
  await appController.event(ctx, next)  // 只支持app端
}

module.exports.classlist = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      await webController.classlist(ctx, next); break;
    default:
      await appController.classlist(ctx, next);
  }
}

module.exports.semesterinfo = async (ctx, next) => {
  await appController.semesterinfo(ctx, next)  // 暂时只支持app端
}

module.exports.selfinfo = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'webvpn':
      await webVpnController.selfinfo(ctx, next); break;
    default:
      // await webController.selfinfo(ctx, next);
      await webVpnController.selfinfo(ctx, next); break;
  }
}

module.exports.program = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'webvpn':
      await webVpnController.program(ctx, next); break;
    default:
      await webController.program(ctx, next);
  }
}

module.exports.lesson_survey = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'webvpn':
      await webVpnController.lesson_survey(ctx, next); break;
    default:
      await webController.lesson_survey(ctx, next);
  }
}

module.exports.course_select = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'webvpn':
      await webVpnController.course_select(ctx, next); break;
    default:
      await webController.course_select(ctx, next);
  }
}

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


