const Sequelize = require('sequelize');
// 数据库配置文件
const sqlConfig = {
  // host: '127.0.0.1',
  // user: 'root',
  // password: 'microonline697',
  database: 'online_user_default',
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
