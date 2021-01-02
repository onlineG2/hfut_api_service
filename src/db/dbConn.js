const Sequelize = require('sequelize');
// 数据库配置文件
const sqlConfig = {
  database: 'schedule-hacked',
  
  user: 'root',
  password: '你的密码',
  host: '127.0.0.1',
  
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
