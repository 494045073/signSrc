'use strict';
const WXBizDataCrypt = require('../public/WXBizDataCrypt')
const Controller = require('egg').Controller;
const utils = require('utility');
const got = require('got');

class UserController extends Controller {
  async verify(){
    const {
      ctx,
    } = this;
    const {
      username,
      token,
    } = ctx.request.body;
    try {
      if (token){
        const userinfo=await ctx.model.User.findOne({
          where:{
            username:username
          }
        })
        return ctx.body ={
          success:true,
          info:'已登录',
          data:userinfo
        }
      }
      return ctx.body ={
        success:false,
        info:'未登录',
      }
    }catch (e){
      console.log(e)
      return ctx.body={
        success:false,
        info:'网络错误',
      }
    }
  }
  async loginByWechat() {
    const {
      ctx,
    } = this;
    const {
      encryptedData,
      code,
      pid,
      iv,
    } = ctx.request.body;
    // todo 1.还需要填入appid和secret；2.请求、校验失败的处理
    const appid = 'wx0fca0a82d8931fed';
    const secret = '776a0e066e1aa20aa38f8b24ab8c4bf7';
    let url=`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`
    const {data}=await ctx.curl(url,{
      method: 'GET',
      rejectUnauthorized: false,
      dataType: 'json',
    })
    const pc = new WXBizDataCrypt(appid, data.session_key)
    const datas = pc.decryptData(encryptedData , iv)
    const findUser=await ctx.model.User.findOne({
      where:{
        openID:datas.nickName
      }
    })
    const newUserInfo={
      phone:'',
      username: datas.nickName,
      avatar: datas.avatarUrl
    }
    if (findUser==null){
      const newUser=await ctx.model.User.create(newUserInfo)
      return ctx.body = {
        success: true,
        info: '登入成功',
        data: data
      };
    }
    ctx.body = {
      success: true,
      info: '登入成功',
      data: data
    };
    // let res = await got(url);
    // console.log(res.access_token)
    // let resObj = JSON.parse(res);
    // const access_token = resObj.access_token;
    // const openid = resObj.openid;
    // // step.3 通过access_token调用接口
    // url = `https://api.weixin.qq.com/sns/auth?access_token=${access_token}&openid=${openid}`;
    // res = await got(url);
    // resObj = JSON.parse(res);
    // // step.4 检验授权凭证（access_token）是否有效，获取用户信息
    // if (resObj.errmsg !== 'ok') {
    //   // 授权凭证无效
    //   return ctx.body = {
    //     success: false,
    //     info: '登入失败，请重新登录',
    //   };
    // }
    // url = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}`;
    // res = await got(url);
    // const userInfo = JSON.parse(res); // 内容：openid，nickname，sex，language，city，province，country，headimgurl，privilege，unionid
    // const wUser = await ctx.model.UserWechat.findOne({
    //   where: {
    //     openid: userInfo.openid,
    //   },
    // });
    //
    // let user;
    // const createNewUser = async () => {
    //   // 注册新用户对象
    //   const newUserObj = {
    //     username: userInfo.nickname,
    //   };
    //   // 如果是通过邀请链接注册，就加入pid
    //   if (pid.trim()) {
    //     newUserObj.pid = Number(pid.trim());
    //   }
    //   // 注册
    //   user = await ctx.model.User.create(newUserObj);
    // };
    // if (!wUser) {
    //   // 无微信用户
    //   await createNewUser();
    //   const newWeChatUser = {
    //     uid: user.uid,
    //     openid: userInfo.openid,
    //   };
    //   await ctx.model.UserWechat.create(newWeChatUser);
    // } else {
    //   // 存在微信用户，查找用户表
    //   user = await ctx.model.User.findOne({
    //     where: {
    //       uid: wUser.uid,
    //     },
    //   });
    //   if (!user) {
    //     await createNewUser();
    //   }
    // }
    // todo 暂时没考虑创建失败的处理，等能测试的时候再写

  }
  async login(){
    const {
      ctx,
    } = this;
    const {
      username,
      password,
    } = ctx.request.body;
    try {
      const user=await ctx.model.User.findOne({
        where:{
          username:username
        }
      })
      if (user.password==password && user.username==username){
        return ctx.body={
          code:200,
          success:true,
          msg:'登录成功',
          data:{
            userinfo:user,
            token:'1234'
          }
        }
      }
      return ctx.body={
        success:false,
        info:'用户名或密码错误'
      }
    }catch (e) {
      return ctx.body={
        success:false,
        info:'网络错误'
      }
    }
  }
  async findAllUserinfo() {
    const {
      ctx,
      app,
    } = this;
    const {
      Op,
    } = app.Sequelize;
    const {
      uid,
      username,
      avatar,
      search,
      phone,
      appID,
    } = ctx.request.body;

    try {
      let where = {};
      // 如果有search，执行模糊查询
      if (search) {
        where = {
          [Op.or]: [
            { uid: search },
            { name: { [Op.like]: '%' + search + '%' } },
            { phone: search },

          ],
        };
      }
      // 查询所有信息
      const res = await ctx.model.User.findAll({
        where,
      });
      ctx.body = {
        success: true,
        info: '用户信息查询成功',
        data: {
          all: res,
        },
      };

    } catch (e) {
      console.log(e);
      ctx.body = {
        success: false,
        info: '用户信息查询失败',
      };
    }
  }
  async getUserinfo() {
    const {
      ctx,
      app,
    } = this;
    const {
      Op,
    } = app.Sequelize;
    const {
      uid,
      username,
      avatar,
      search,
      phone,
      appID,
    } = ctx.request.body;
    try {
      // 查询所有信息
      const res = await ctx.model.User.findOne({
        where:{
          uid
        },
      });
      return ctx.body = {
        code: 200,
        success: true,
        info: '用户信息查询成功',
        data: {
          userinfo: res,
        },
      };

    } catch (e) {
      ctx.body = {
        success: false,
        info: '用户信息查询失败',
      };
    }
  }
}

module.exports = UserController;
