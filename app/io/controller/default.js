'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {

  async room() {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    const message = ctx.args[0];
    try {
      // // 关联赛区表
      // await ctx.model.GamesApply.belongsTo(ctx.model.User, { foreignKey: 'uid', targetKey: 'uid' });
      // // 查找赛事申请
      // const res = await ctx.model.GamesApply.findAndCountAll({
      //   where: {
      //     geid: message.geid, // 赛事id
      //   },
      //   include: [{
      //     model: ctx.model.User,
      //     attributes: {
      //       exclude: [ 'pwd' ],
      //     },
      //   }],
      // });
      // // 根据查找的统计人数修改赛事的报名人数
      // await ctx.model.GamesEvent.update({
      //   pcu: res.count,
      // }, {
      //   where: {
      //     geid: message.geid,
      //   },
      // });
      // // nsp.emit('receive', res);
      // nsp.emit('receive'+message.geid,res)
    } catch (e) {

    }

  }
}

module.exports = DefaultController;
