'use strict';

const Controller = require('egg').Controller;

class indexController extends Controller {
    async getnews() {
        const { ctx } = this;
        const authorization = ctx.get('Authorization');
        if(authorization === ''){
            ctx.throw(401,'token 过期，请重新登陆');
        }
        const token = authorization&&authorization.split('')[1];
        let tokenContent;
        try {
            tokenContent = await jwt.verify(token, '');
            console.log(tokenContent);
            ctx.body = tokenContent;
        } catch (error) {
            ctx.throw(401, '无效token');
        }
    }
}

module.exports = indexController;