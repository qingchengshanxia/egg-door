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
  config.keys = appInfo.name + '_1562999108181_9520';

  // add your middleware config here
  config.middleware = [];

  //变更解析时允许的最大长度
  // 注意：在调整 bodyParser 支持的 body 长度时，如果我们应用前面还有一层反向代理（Nginx），可能也需要调整它的配置，确保反向代理也支持同样长度的请求 body。
  config.bodyParser = {
    jsonLimit: '1mb',
    formLimit: '1mb',
  };
  //文件相关配置
  config.multipart = {
    mode: 'file',
    fileExtensions: ['.apk'] // 增加对 apk 扩展名的文件支持
  };
  //配置jwt生成token
  config.jwt = {
    enable: false,
    secret: "123456"
  };
  config.security = {
    csrf: {
      enable: true,
      ignoreJSON: true
    },
    domainWhiteList: ['http://127.0.0.1:7001', 'http://127.0.0.1:3001'],
  }

  config.mysql = {
    // 单数据库信息配置
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '1989long',
      database: 'test',      // 数据库名
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  //配置sequelize插件
  config.sequelize = {
    dialect: 'mysql',//support: mysql, mariadb, postgres, mssql
    // connectionUri: 'mysql://root:@127.0.0.1:3306/test',
    host: 'localhost',
    port: 3306,
    username:'root',
    password: '1989long',
    database: 'egg-sequelize-default',
    timezone: '+08:00', // 保存为本地时区
  };

  //配置redis  
  config.redis = {
    client: {
      port: 6379, // Redis port 
      host: '127.0.0.1', // Redis host 
      password: '',
      db: 0,
    }
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
