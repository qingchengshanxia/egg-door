/**
 *helper，service 中的 this 指向 helper，service 对象本身，使用 this.ctx 访问 context 对象
 *this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
 *Helper 函数用来提供一些实用的 utility 函数。
 *它的作用在于我们可以将一些常用的动作抽离在 helper.js 里面成为一个独立的函数，这样可以用 JavaScript 来写复杂的逻辑，避免逻辑分散各处。
 *另外还有一个好处是 Helper 这样一个简单的函数，可以让我们更容易编写测试用例。 
 * 
 */
const jwt = require('jsonwebtoken');
module.exports = {
    getAccessToken() {
        //获取前端请求携带的token
        let bearerToken = this.ctx.request.header.authorization;
        return bearerToken && bearerToken.replace("Bearer", "");
    },
    createToken(data) {
        //生成token
        const { app } = this;
        return jwt.sign({
            username: data.username,
            password: data.password
        }, app.config.jwt.secret, {
                expiresIn: '24h'  // 过期时间
            }
        )
    },
    // async verifyToken(userId) {
    //     let token = this.ctx.getAccessToken(this.ctx);
    //     let verifyResult = await this.ctx.service.public.verifyToken(token);
    //     if (!verifyResult.verify) {
    //         this.ctx.helper.error(this.ctx, 401, verifyResult.message);
    //         return false;
    //     }
    //     if (userId != verifyResult.message.id) {
    //         this.ctx.helper.error(this.ctx, 401, "用户 ID 与 Token 不一致");
    //         return false;
    //     }
    //     return true;
    // },
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            this.app.jwt.verify(token, this.app.config.jwt.secret, function (err, decoded) {
                let result = {};
                if (err) {
                    result.verify = false;
                    result.message = err.message;
                } else {
                    result.verify = true;
                    result.message = decoded;
                }
                resolve(result);
            })
        })
    },
    success(result = null, message = "请求成功") {
        this.ctx.body = {
            code: 0,
            message: message,
            data: result
        };
        this.ctx.status = status;
    },
    error(code, message) {
        this.ctx.body = {
            code: code,
            message: message
        };
        this.ctx.status = code;
    }
}