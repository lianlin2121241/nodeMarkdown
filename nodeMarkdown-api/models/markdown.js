var mongodb = require('./db');

/**
 * @class
 * @classdesc 任务信息model类
 * @desc 初始化任务信息
 */
class Markdown {
    constructor(markdown) {
        if(!!markdown){
            this.title = markdown.title||'';
            this.content=markdown.content||"";
        }
    }

    /**
     * @desc 保存markdown任务
     * @param {object} user 编辑用户
     * @param {function} callback 回调函数
     */
    save(user, callback) {
        let markdown = {
            title: this.title,
            content: "",
            isDelete: false,
            user: user,
            meta: {
                createTime: new Date(),
                updateTime: 0,
                deleteTime: 0
            }
        };
        mongodb.insertOne("markdowns", markdown, function (err, markdown) {
            if (err) {
                return callback(err);
            }
            callback(null, markdown[0]);
        })
    }

    /**
     * @desc 更新markdown任务
     * @param {object} params 查询条件
     * @param {function} callback 回调函数
     */
    update(params = null, callback) {
        if (!params) {
            callback(new Error('缺少参数'))
        }
        mongodb.updateMany("markdowns", params, {
            $set: {
                "title": this.title,
                "content": this.content,
                "meta.updateTime": new Date()
            }
        }, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        })
    }

    /**
     * @desc 删除markdown任务
     * @param {object} params 查询条件
     * @param {function} callback 回调函数
     */
    delete(params = null, callback) {
        if (!params) {
            callback(new Error('缺少参数'))
        }
        mongodb.updateMany("markdowns", params, {
            $set: {
                "isDelete": true,
                "meta.deleteTime": new Date()
            }
        }, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        })
    }

    /**
     * @static
     * @desc 根据条件查询markdown列表
     * @param {object} params 查询条件
     * @param {object or function} P 分页对象或者回调函数
     * @param {function or undefind} C 回调函数
     */
    static get(params = {}, P, C) {
        var callback=null;
        var pagination=null;
        var argArr=[];
        argArr.push("markdowns", params);
        if (arguments.length == 2){
            callback=P;
        }else if(arguments.length == 3){
            pagination=P;
            callback=C;
            argArr.push(pagination);
        }
        argArr.push(function (err, markdown) {
            if (err) {
                return callback(err);
            }
            callback(null, markdown);
        });
        mongodb.find.apply(this,argArr);
    }
    
    /**
     * @static
     * @desc 获取目标的总量
     * @param {object} params 查询条件
     * @param {function} callback 回调函数
     */
    static getAllCount(params = {}, callback) {
        mongodb.getAllCount("markdowns", params, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        })
    }
}
module.exports = Todo;

