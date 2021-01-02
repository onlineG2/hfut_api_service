const Sequelize = require('sequelize');
const sequelize = require('../dbConn');

const user = sequelize.define('user', {
  user_code: { type: Sequelize.INTEGER, primaryKey: true },
  password: Sequelize.STRING(200),
  user_key: Sequelize.STRING(100),
  student_id: Sequelize.STRING(50),
  user_name: Sequelize.STRING(50),
  gender: Sequelize.INTEGER,
  account_email: Sequelize.STRING(50),
  birthday: Sequelize.DATE,
  mobile_phone: Sequelize.STRING(100),
  depart_name: Sequelize.STRING(50),
  major_name: Sequelize.STRING(50),
  adminclass_name: Sequelize.STRING(50),
  ancestral_addr: Sequelize.STRING(200),
  direction_name: Sequelize.STRING(100),
});

module.exports = user;
