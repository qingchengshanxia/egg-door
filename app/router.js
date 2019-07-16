'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);
  // router.get('/user/:id', controller.user.info);
  /* 
  * 这里的第二个对象不再是控制器，而是 jwt 验证对象，第三个地方才是控制器
  * 只有在需要验证 token 的路由才需要第二个 是 jwt 否则第二个对象为控制器
  **/
  router.post('login','/user/login', controller.user.login);
  router.post('register','/user/register', controller.user.register);
  router.get('getnews','/getnews',controller.index.getnews);
  // router.resources('user','/users',controller.users);
};
