

module.exports = appInfo => {
    //配置sequelize插件
    config.sequelize = {
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        database: 'egg-sequelize-test',
    };
}