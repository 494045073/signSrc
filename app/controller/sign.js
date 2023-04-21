'use strict';
const Controller = require('egg').Controller;
const utils = require('utility');
class signController extends Controller{
    async createSign(){
        const {ctx} = this
        const {
            startTime,
            endTime,
            duration,
            signRange,
            signPlace,
            createId,
            cid
        } = ctx.request.body
        try {
            const data = {
                startTime:startTime,
                endTime:endTime,
                duration:duration,
                signRange:signRange,
                signPlace:signPlace,
                createId:createId,
                cid:cid,
            }
            await ctx.model.Sign.create(data)
            return ctx.body = {
                success:true,
                info:'签到已开启',
                code:200
            }
        }catch (e) {

        }
    }
}
module.exports=signController