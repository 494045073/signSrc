'use strict';
const Controller = require('egg').Controller;
const utils = require('utility');
class addCourseController extends Controller {
    // 创建课程
    async addCourse(){
        const {
            ctx,
            app,
        } = this;
        const {
            cname,
            cplace,
            teacher,
            ctime,
            cClass,
            cImg,
            Elective_student,
            createId,
            intrant
        } = ctx.request.body;
        try {
            const code = await ctx.service.inviteCode.getCode()
            const data={
                cname:cname,
                cplace:cplace,
                teacher:teacher ,
                ctime:ctime.toString(),
                cClass:cClass,
                cImg:cImg,
                Elective_student:Elective_student,
                createId:createId,
                intrant:intrant,
                inviteCode:code,
                createTime:new Date().getTime()
            }
            await ctx.model.Course.create(data)
            const findCourse = await ctx.model.Course.findAll({
                where:{
                    createId
                }
            })
             findCourse.forEach((item,index,arr)=> {
                 arr[index].ctime=arr[index].ctime.split(',')
            })
            return ctx.body={
                code: 200,
                success: true,
                info:'创建课程成功',
                course:findCourse
            }
        }catch (e){
            console.log(e)
            return ctx.body={
                code:204,
                success:false,
                info:'网络错误'
            }
        }
    }
    // 邀请加入
    async invite(){
        const {
            ctx,
            app,
        } = this;
        const {
            cname,
            cplace,
            teacher,
            ctime,
            cClass,
            cImg,
            Elective_student,
            createId,
            intrant
        } = ctx.request.body;
        try {
            // const data={
            //
            // }
            // await ctx.model.Course.create(data)
            // const findCourse = await ctx.model.Course.findAll({
            //     where:{
            //         createId
            //     }
            // })
            // findCourse.forEach((item,index,arr)=> {
            //     arr[index].ctime=arr[index].ctime.split(',')
            // })
            // return ctx.body={
            //     code: 200,
            //     success: true,
            //     info:'创建课程成功',
            //     course:findCourse
            // }
        }catch (e){
            console.log(e)
            return ctx.body={
                code:204,
                success:false,
                info:'网络错误'
            }
        }
    }
    // 上传图片
    async adUpload() {
        const { ctx } = this;
        const { service } = ctx;
        const res = await service.upload.uploadFile(ctx);
        ctx.body = res;
    }
    //查询用户创建的所有课程
    async findCreateCourse(){
        const {
            ctx,
            app,
        } = this;
        const {
            createId,
        } = ctx.request.body;
        try {
            console.log(createId)
            const findCourse = await ctx.model.Course.findAll({
                where:{
                    createId
                }
            })
            findCourse.forEach((item,index,arr)=> {
                arr[index].ctime=arr[index].ctime.split(',')
            })
            return ctx.body={
                code: 200,
                success: true,
                info:'查找课程成功',
                course:findCourse
            }
        }catch (e){
            return ctx.body={
                code:204,
                success:false,
                info:'网络错误'
            }
        }
    }
}

module.exports = addCourseController;
