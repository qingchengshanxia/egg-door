'use strict';

const Service = require('egg').Service;
const jwt = require('jsonwebtoken');
const curDate = require('silly-datetime');

class UserService extends Service {
    async startLogin() {
        const { ctx } = this;
        const { username, password } = ctx.request.body;
        if (!username || !password) {
            ctx.body = {
                msg: "登陆失败！",
                code: 101
            };
            ctx.status = 200;
            return false;
        }

        const sql = 'select * from user where username=' + username;
        let users = await ctx.model.query(sql, { type: 'SELECT' });
        //判断是否已经注册
        if (!users.length) {
            ctx.body = {
                msg: "您尚未注册，请先注册！",
                code: 101
            };
            ctx.status = 200;
            return false;
        }

        users = users[0];
        const pwd = users.password;
        if (password != pwd) {
            ctx.body = {
                msg: "您的账号密码输入错误！",
                code: 101
            };
            ctx.status = 200;
            return false;
        }

        // ctx.set('Content-Type', 'application/json');
        let obj = {};
        for (const key in users) {
            if (users.hasOwnProperty(key) && key !== 'password') {
                if (key === 'created_at'||key === 'updated_at') {
                    obj[key] = curDate.format(users[key], 'YYYY-MM-DD HH:mm:ss');
                } else {
                    obj[key] = users[key];
                }
            }
        }

        //获取redis中的token
        const token = await ctx.service.cache.get(users.id);
        const data = {
            data: obj,
            code: 100,
            token: token
        }
        return data;
    }
    async startRegister() {
        //向数据库注册账号
        const { ctx } = this;
        const data = ctx.request.body;
        const { username, password } = data;
        if (!username || !password) {
            ctx.body = {
                msg: "注册失败！",
                code: 101
            };
            ctx.status = 200;
            return false;
        }

        //获取用户在数据库对应的id
        const sql = 'select * from user where username=' + username;
        const userId = await ctx.model.query(sql, { type: 'SELECT' });

        //判断是否已经注册
        if (!!userId.length) {
            ctx.body = {
                msg: "您已经注册过，请勿重复注册！",
                code: 101
            };
            ctx.status = 200;
            return false;
        }

        const created_at = curDate.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
        //将注册数据存入数据库
        await ctx.model.User.create({ username, password, created_at });


        //生成token
        const token = ctx.helper.createToken(data);
        const curUserId = await ctx.model.query(sql, { type: 'SELECT' });
        //将token存入redis
        ctx.service.cache.set(curUserId[0].id, token, 3600 * 24 * 30);

        return true;
    }
}

module.exports = UserService;