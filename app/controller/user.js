'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async login() {
        const { ctx } = this;
        const data = await ctx.service.user.startLogin();
        if (!data) {
            return;
        }
        ctx.body = data;
        ctx.status = 200;
    };
    async register() {
        const { ctx } = this;

        let bool = await ctx.service.user.startRegister();
        if (!bool) {
            return;
        }

        ctx.body = {
            data: {
                msg: "注册成功"
            },
            code: 100
        };
        ctx.status = 200;
    }
}

module.exports = UserController;