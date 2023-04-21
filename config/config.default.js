/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const os = require('os');
//获取本机ip
function getIpAddress() {
  /**os.networkInterfaces() 返回一个对象，该对象包含已分配了网络地址的网络接口 */
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}
const myHost = getIpAddress();

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
  config.multipart = {
    mode: 'file',
    fileExtensions: [ '.pdf', 'doc', 'docx', 'pptx', 'xls', 'xlsx', 'epub','apk' ], // 增加对 apk 扩展名的文件支持
    fileSize: '500mb',
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    uploadAvatarDir: 'http://http://103.45.185.51:8888/www/wwwroot/img', // 上传头像路径
  };
  //jwt token配置
  config.jwt = {
    secret: "123456"//自定义 token 的加密条件字符串
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
  config.oss = {
    client: {
      accessKeyId: 'LTAI5tM9EkEws5kzWDJumMP7', // 阿里云账号
      accessKeySecret: 'mOOQ2XJEcGDb7EukbyTA2jRY4UAvVG',
      bucket: 'ktimgbk',
      endpoint: 'oss-cn-beijing.aliyuncs.com',
      timeout: '80s',
    },
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
  // 配置端口信息
  config.cluster = {
    listen:{
      port:7001,
      hostname:myHost
    }
  };
  return {
    ...config,
    ...userConfig,
  };
};
