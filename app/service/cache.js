'use strict';
//获取redis：await this.service.ctx.cache.get(key);
//设置redis：await this.service.ctx.cache.set(key,value,time);

const Service = require('egg').Service;

class CacheService extends Service {
    //seconds:时间，单位 秒，比如：一个月有效期：3600 * 24 * 30
    async set(key, value, seconds) {
        //设置redis的key-value
        value = JSON.stringify(value);
        if (this.app.redis) {
            if (!seconds) {
                await this.app.redis.set(key, value);
            } else {
                await this.app.redis.set(key, value, 'EX', seconds);
            }
        }
    }

    async get(key) {
        //获取redis的key对应的value
        if (this.app.redis) {
            var data = await this.app.redis.get(key);
            if (!data) {
                return;
            }
            return JSON.parse(data);
        }
    }
}

module.exports = CacheService;