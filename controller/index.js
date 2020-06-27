const appController = require('./app-control')
const webController = require('./web-control')


module.exports.login = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      await webController.login(ctx, next); break;
    default:
      await appController.login(ctx, next);
  }
}

module.exports.scorelist = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      await webController.scorelist(ctx, next); break;
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
    default:
      await appController.schedule(ctx, next);
  }
}

module.exports.exam_arrange = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      await webController.exam_arrange(ctx, next); break;
    default:
      await appController.exam_arrange(ctx, next);
  }
}

module.exports.semesterinfo = async (ctx, next) => {
  switch (ctx.request.query.target) {
    case 'web':
      await webController.semesterinfo(ctx, next); break;
    default:
      await appController.semesterinfo(ctx, next);
  }
}

module.exports.selfinfo = async (ctx, next) => {
  await webController.selfinfo(ctx, next)  // 暂时只支持web端
}

module.exports.program = async (ctx, next) => {
  await webController.program(ctx, next)  // 暂时只支持web端
}

module.exports.lesson_survey = async (ctx, next) => {
  await webController.lesson_survey(ctx, next)  // 暂时只支持web端
}

module.exports.course_select = async (ctx, next) => {
  await webController.course_select(ctx, next)  // 暂时只支持web端
}


