'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io, } = app;
  //用户
  router.get('/findAllUserinfo', controller.user.findAllUserinfo);
  router.post('/getUserInfo', controller.user.getUserinfo);
  router.post('/loginByWechat',controller.user.loginByWechat);
  router.post('/login',controller.user.login)
  router.post('/verify',controller.user.verify);
  //留言
  router.post('/message',controller.message.message);
  io.of('/').route('room', io.controller.default.room);
};
