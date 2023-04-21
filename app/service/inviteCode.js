const Service = require('egg').Service;
const utils = require('utility');
class courseService extends Service {
    // 邀请码生成
    async getCode() {
        const rand = utils.randomString(6, '0123456789QWERTYUIPASDFGHJKZXCVBNMLO');
        const one = await this.ctx.model.Course.findOne({
            where: { inviteCode: rand }
        });
        if (!one) return rand;
        return await this.getCode();
    }

}
module.exports = courseService;