/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1665822784033_5418';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 开启 cors跨越
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,OPTIONS,PUT,POST,DELETE,PATCH',
    credentials:true
  };
  // 关闭 csrf跨域
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*']//[]中放放出的白名单，*代表所有
  };
  // nucjuck配置
  config.view = {
    // 遍历所有的.nj文件由nunjucks来处理
    mapping: {
      '.nj': 'nunjucks',
    },
    defaultExtension: '.nj', // 设置渲染的模板文件后缀是.nj 使用的时候可以略去
    defaultViewEngine: 'nunjucks', // 默认的渲染引擎

  };
  config.sequelize = {
    dialect: 'mysql', //数据库类型
    database: 'mydbsql' , //数据库名称
    host: 'mysql.sqlpub.com', //数据库ip地址
    port: '3306',      //数据库端口
    username: 'mydbsql',   //数据库用户名
    password: '3e3f501a14c4264d',   //数据库密码
    define:{
      underscored: false, // 禁止把下划线做间隔的表明转变成驼峰
      freezeTableName: true, // 冻结表名 意思是 sequelize会自动把表名添加负数，所以需要冻结避免被修改
      timestamps: false,
    }
  };

  // 配置socket
  config.io = {
    init: {}, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: ['connection'],
        packetMiddleware: [],
      },
      '/example': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  };
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
