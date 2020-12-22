const Sequelize = require('sequelize');
// 数据库配置文件
const sqlConfig = {
  database: 'schedule-hacked',
  
  // user: 'root',
  // password: 'microonline697',
  // host: 'rm-bp1xh78n7jgm1kks3125010.mysql.rds.aliyuncs.com',
  user: 'root',
  password: 'LzwAiTx1314',
  host: 'gz-cdb-rpcvgaar.sql.tencentcdb.com',
  port: 59601,
  
};

const sequelize = new Sequelize(sqlConfig.database, sqlConfig.user, sqlConfig.password, {
  host: sqlConfig.host,
  port: sqlConfig.port,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  timezone: '+08:00',
});

module.exports = sequelize;
