'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
    // 解决跨域的方法 新增 start
    cors: {
        enable: true,
        package: 'egg-cors',
    },
    // 启用nunjucks
    nunjucks: {
        enable: true,
        package: 'egg-view-nunjucks',
    },
    sequelize: {
        enable: true,
        package: 'egg-sequelize',
    },
    // socket
    io: {
        enable: true,
        package: 'egg-socket.io',
    },
    redis: {
        enable: true,
        package: 'egg-redis',
    },
};
