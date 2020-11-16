const users = require('../../src/db/models/user')

async function autoSave(userInfo, username, password) {
  userInfo.user_code = username
  userInfo.password = new Buffer(password).toString('base64');
  // console.log(userInfo)
  const user = await users.findByPk(userInfo.user_code);
  switch (userInfo.gender) {
    case '男':
      userInfo.gender = 1;
      break;
    case '女':
      userInfo.gender = 2;
      break;
    default:
      break;
  }
  userInfo.student_id = userInfo.studentId

  if (!user) {
    await users.create(userInfo);
    return {};
  }
  // 已有用户，更新数据
  await users.update(userInfo, {
    where: {
      user_code: userInfo.user_code,
    },
  });

  // users.close()
}

module.exports = autoSave
