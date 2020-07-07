const appController = require('./app-controller')
const webController = require('./web-controller')
const webVpnController = require('./web-vpn-controller')


module.exports.login = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      await webController.login(ctx, next); break;
    case 'webvpn':
      await webVpnController.login(ctx, next); break;
    default:
      await appController.login(ctx, next);
  }
}

module.exports.scorelist = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      await webController.scorelist(ctx, next); break;
    case 'webvpn':
      await webVpnController.scorelist(ctx, next); break;
    default:
      await appController.scorelist(ctx, next);
  }
}

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

module.exports.schedule = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      await webController.schedule(ctx, next); break;
    case 'webvpn':
      await webVpnController.schedule(ctx, next); break;
    default:
      await appController.schedule(ctx, next);
  }
}

module.exports.exam_arrange = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      await webController.exam_arrange(ctx, next); break;
    case 'webvpn':
      await webVpnController.exam_arrange(ctx, next); break;
    default:
      await appController.exam_arrange(ctx, next);
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
      await webController.selfinfo(ctx, next);
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


