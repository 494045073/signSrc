const Service = require('egg').Service;
const fs = require('fs'); // 引入node的文件处理模块
const path = require('path');
const utils = require('utility'); // 引入一个工具库
// const Excel = require('exceljs');
class CommonService extends Service {
    // @author 777
    // @last update 2020年11月12日 16:15
    // @公共的图片上传
    // fileList文件列表  type 文件类型
    async uploadFile(ctx, _type) {
        // try {
        //     // 0、获取文件
        //     let file = ctx.request.files[0];
        //     console.log('获取文件', file);
        //     // ctx.request.files[0] 表示获取第一个文件，若前端上传多个文件则可以遍历这个数组对象
        //     let fileData = fs.readFileSync(file.filepath);
        //     console.log('fileData', fileData);
        //     // 1、获取当前日期
        //     // let day = moment(new Date()).format('YYYYMMDD');
        //     let day = utils.YYYYMMDD('');
        //     console.log('1、获取当前日期', day);
        //     // 2、创建图片保存的路径
        //     let dir = path.join(config.uploadAvatarDir, day);
        //     console.log('2、创建图片保存的路径', dir);
        //     // 3、创建目录
        //     // await mkdirp(dir);
        //     // 4、生成路径返回
        //     let date = Date.now(); // 毫秒数
        //     let tempDir = path.join(dir, date + path.extname(file.filename)); // 返回图片保存的路径
        //     console.log('毫秒数 extname', date, path.extname(file.filename));
        //     console.log('返回图片保存的路径', tempDir);
        //     // 5、写入文件夹
        //     fs.writeFileSync(tempDir, fileData);
        //     ctx.body = {
        //         status: 200,
        //         desc: '上传成功',
        //         data: tempDir,
        //     }
        // } catch(error) {
        //     ctx.body = {
        //         status: 500,
        //         desc: '上传失败',
        //         data: null
        //     }
        // } finally {
        //     // 6、清除临时文件
        //     ctx.cleanupRequestFiles();
        // }
        const file = ctx.request.files[0];
        const ext = file.filename.split('.').pop(); // 得到文件后缀
        const _date = utils.YYYYMMDD('');
        const type = _type ? _type : 'common';
        const normalPath = `${type}/${_date}`; // 路径
        let newFileName = Date.now() + '.' + ext;
        try {
            // 处理文件，比如上传到云端
            console.log('do upload to the oss');
            // 如果是doc xlsx xls文件 就使用原来的文件名称
            if (ext == 'doc' || ext == 'xlsx' || ext == 'xls' || ext == 'pdf') {
                newFileName = file.filename.split(' ').join('');
            }
            const res = await ctx.oss.put(normalPath + '/' + newFileName, file.filepath);
            console.log(res);
            console.log('end');
            return { success: true, imgUrl: res.url };//
            //  todo 还要保存到附件表里面
            // return { success: true, msg: 'http://static.1775.net.cn/' + normalPath + '/' + newFileName };//
        } catch (e) {
            console.log(e);
            return { success: false, msg: e };
        } finally {
            // await fs.unlinkSync(file.filepath);
        }
    }
    /**
     * 请求接口得到数据并生成excel
     *  支持复杂表头（m1:合并单元格左上坐标；m2:合并单元格右下坐标）
     *  支持合计行  totalRowText totalRow
     *  支持数据自定义 func
     *  支持数据字典
     *  支持日期
     * @param {string} url 接口地址：相对地址或者http开头完整地址
     * @param {object} req 请求数据
     * @param {Array} headers excel标题栏
     * @param {string} name 文件名称
     * @param {function} func 数据自定义函数
     */
    // async excelNew(data, headers, name, func) {
    //     const columns = [];// exceljs要求的columns
    //     const hjRow = {};// 合计行
    //     const titleRows = headers.length;// 标题栏行数
    //     // 处理表头
    //     for (const col of headers) {
    //         const { f, t, w = 15 } = col;
    //         if (!f) continue;// 不存在f则跳过
    //         if (col.totalRow) hjRow[f] = true;
    //         if (col.totalRowText) hjRow[f] = col.totalRowText;
    //         col.style = { alignment: { vertical: 'middle', horizontal: 'center' } };
    //         col.header = t;
    //         col.key = f;
    //         col.width = w;
    //         columns.push(col);
    //     }
    //     const workbook = new Excel.Workbook();
    //     const sheet = workbook.addWorksheet('My Sheet', { views: [{ xSplit: 0, ySplit: 0 }] });
    //     sheet.columns = columns;
    //     sheet.addRows(data.map(r => {
    //         console.log(r);
    //         let statestr = '';
    //         if (r.state == 2) statestr = '等待确认';
    //         if (r.state == 3) statestr = '成功';
    //         if (r.state == -1) statestr = '不符合';
    //         const activityId = r.activityId;
    //         const title = r.activity.title;
    //         const addTime = new Date(r.addTime).toLocaleTimeString();
    //         const op = {};
    //         for (const item of JSON.parse(r.activity.options)) {
    //             op[item.keyname] = item.value instanceof Array ? item.value.join() : item.value;
    //         }
    //         return {
    //             uid: r.uid,
    //             state: statestr,
    //             activityId,
    //             title,
    //             addTime,
    //             ...op,
    //         };
    //     }));
    //     // 处理复杂表头
    //     if (titleRows > 1) {
    //         // for (let i = 1; i < titleRows; i++) sheet.spliceRows(1, 0, []);// 头部插入空行
    //         for (let i = 0; i < titleRows; i++) {
    //             const row = headers[i];
    //             for (let j = 0, rlen = row.length; j < rlen; j++) {
    //                 const col = row[j];
    //                 if (!col.m1) continue;
    //                 sheet.getCell(col.m1).value = col.t;
    //                 sheet.mergeCells(col.m1 + ':' + col.m2);
    //             }
    //         }
    //     }
    //     // 处理样式、日期、字典项
    //     const that = this;
    //     sheet.eachRow(function(row, rowNumber) {
    //         // 设置行高
    //         row.height = 25;
    //         row.eachCell({ includeEmpty: true }, function(cell, colNumber) {
    //             // 设置边框 黑色 细实线
    //             const top = { style: 'thin', color: { argb: '000000' } };
    //             const left = { style: 'thin', color: { argb: '000000' } };
    //             const bottom = { style: 'thin', color: { argb: '000000' } };
    //             const right = { style: 'thin', color: { argb: '000000' } };
    //             cell.border = { top, left, bottom, right };
    //             // 设置标题部分为粗体
    //             if (rowNumber <= titleRows) { cell.font = { bold: true }; return; }
    //             // 处理数据项里面的日期和字典
    //             const { type, dict } = columns[colNumber - 1];
    //             if (type && (cell.value || cell.value == 0)) return;// 非日期、字典或值为空的直接返回
    //             switch (type) {
    //                 case 'date': cell.value = that.parseDate(cell.value); break;
    //                 case 'dict': cell.value = that.parseDict(cell.value.toString(), dict); break;
    //             }
    //
    //         });
    //     });
    //     this.ctx.set('Content-Type', 'application/vnd.openxmlformats');
    //     this.ctx.set('Content-Disposition', "attachment;filename*=UTF-8' '" + encodeURIComponent(name) + '.xlsx');
    //     this.ctx.body = await workbook.xlsx.writeBuffer();
    // }
}
module.exports = CommonService;

