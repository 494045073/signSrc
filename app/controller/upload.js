'use strict';
const Controller = require('egg').Controller;
const utils = require('utility');
class Upload extends Controller {
    async fileUpload() {
        const { ctx } = this;
        const { service } = ctx;
        const res = await service.upload.uploadFile(ctx);
        return ctx.body = res;
    }
}

module.exports = Upload;
