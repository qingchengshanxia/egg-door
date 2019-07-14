'use strict';

const Service = require('egg').Service;

class UserService extends Service {
    async find(uid) {
        const user = await this.app.mysql.get('test1', { id: uid });
        return user;
    }
}

module.exports = UserService;