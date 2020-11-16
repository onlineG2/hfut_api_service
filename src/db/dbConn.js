const Sequelize = require('sequelize');
// 数据库配置文件
const sqlConfig = {
  database: 'online_user_default',

  // user: 'root',
  // password: 'microonline697',
  // host: 'rm-bp1xh78n7jgm1kks3125010.mysql.rds.aliyuncs.com',  // 内网地址
  
};

const sequelize = new Sequelize(sqlConfig.database, sqlConfig.user, sqlConfig.password, {
  host: sqlConfig.host,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  timezone: '+08:00',
});

module.exports = sequelize;
