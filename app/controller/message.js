'use strict';
const Controller = require('egg').Controller;
const utils = require('utility');
class MessageController extends Controller {
    async message(){
        const {
            ctx,
            app,
        } = this;
        const {
            QQ,
            name,
            email,
            message,
            phone,
        } = ctx.request.body;
        try {
            const data={
                QQ:parseInt(QQ) || null,
                name:name,
                email:email ,
                message:message,
                phone:parseInt(phone) || null,
            }
            console.log(data)
            await ctx.model.Message.create(data)
            return ctx.body={
                code: 200,
                data:{
                    code:200,
                    success: true,
                    msg:'提交成功'
                }
            }
        }catch (e){
            console.log(e)
            return ctx.body={
                code:204,
                data: {
                    success:false,
                    code:204,
                    msg:'网络错误'
                }
            }
        }
    }
}

module.exports = MessageController;
