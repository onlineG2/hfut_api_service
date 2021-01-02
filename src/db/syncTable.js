const user = require('./models/user');

// 同步表结构
user.sync({
    force: true  // 强制同步，先删除表，然后新建
});

// node src/db/syncTable.js