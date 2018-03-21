var utils = require('../utils');
var markdownModel = require('../models/markdown');

/**
 * @desc 新建md文件
 * @param {object} newFile 
 */
module.exports.createMarkdown =function(req, res){
    var title = req.body.title
    var newMarkdown = new markdownModel({
        title: title
    })
    var user = req.session.user;
    if (!user) {
        req.flash('error', '用户未登录');
        return res.json(utils.resultData(false, '', '用户未登录'));
    }
    newMarkdown.save(user, function (err, markdown) {
        if (err) {
            req.flash('error', err);
            return res.json(utils.resultData(false, null, err.message));
        }
        req.flash('success', '添加任务成功');
        res.json(utils.resultData(true, markdown));
    })
}

/**
 * @desc 保存md文件
 */
module.exports.saveMarkdown =function(req, res){
    var id = req.body.id;
    var title = req.body.title;
    var content = req.body.content;

    markdownModel.get({
        _id: ObjectID(id)
    }, function (err, markdown) {
        if (err) {
            req.flash('error', err);
            return res.json(utils.resultData(false, null, err.message));
        }
        if (!markdown || markdown.length === 0) {
            req.flash('error', '无此文档');
            return res.json(utils.resultData(false, null, '无此文档'));
        }
        var newMarkdown = new markdownModel({
            title: title,
            content: content
        })
        newMarkdown.update({ _id: ObjectID(id) }, function (err, result) {
            if (err) {
                req.flash('error', err);
                return res.json(utils.resultData(false, null, err.message));
            }
            if(result===1){
                req.flash('success', '修改成功');
                res.json(utils.resultData(true));
            }else{
                req.flash('error', '失败');
                res.json(utils.resultData(false, '','修改失败'));
            }
        })
    })
}

/**
 * @desc 查询文件列表
 */
module.exports.queryMarkdownList =function(req, res){
    var currentPage = req.body.currentPage||0;
    var pageSize = req.body.pageSize||0;

    var user=req.session.user;
    markdownModel.get({
        "user._id":user._id,
        "isDelete":false
    },{
        currentPage: currentPage,
        pageSize: pageSize,
        sort:{'sort':1}
    }, function (err, markdowns) {
        if (err) {
            req.flash('error', err);
            return res.json(utils.resultData(false, null, err.message));
        }
        req.flash('success', '查询成功');
        res.json(utils.resultData(true,markdowns));
    })
}

/**
 * @desc 根据id获取文件内容
 */
module.exports.getMarkdownById =function(req, res){
    let id = req.body.id;
    var user=req.session.user;
    markdownModel.get({
        "_id": ObjectID(id),
        "user._id":user._id,
        "isDelete":false
    }, function (err, markdown) {
        if (err) {
            req.flash('error', err);
            return res.json(utils.resultData(false, null, err.message));
        }
        req.flash('success', '查询成功');
        res.json(utils.resultData(true,markdown));
    })
}

/**
 * @desc 根据id删除文件
 */
module.exports.deleteMarkdownById =function(req, res){
    let id = req.body.id;

    markdownModel.get({
        "_id": ObjectID(id),
        "isDelete":false
    }, function (err, markdown) {
        if (err) {
            req.flash('error', err);
            return res.json(utils.resultData(false, null, err.message));
        }
        if (!markdown || markdown.length === 0) {
            req.flash('error', '无此文档');
            return res.json(utils.resultData(false, null, '无此文档'));
        }
        var newMarkdown = new markdownModel()
        newMarkdown.delete({ _id: ObjectID(id) }, function (err, result) {
            if (err) {
                req.flash('error', err);
                return res.json(utils.resultData(false, null, err.message));
            }
            if(result===1){
                req.flash('success', '删除成功');
                res.json(utils.resultData(true));
            }else{
                req.flash('error', '失败');
                res.json(utils.resultData(false, '','删除失败'));
            }
        })
    })
}

/**
 * @desc 根据Id下载文件
 */
module.exports.downMarkdown = function(req, res){
    let id = req.body.id;

    markdownModel.get({
        "_id": ObjectID(id)
    }, function (err, markdown) {
        if (err) {
            req.flash('error', err);
            return res.json(utils.resultData(false, null, err.message));
        }
        if (!markdown || markdown.length === 0) {
            req.flash('error', '无此文档');
            return res.json(utils.resultData(false, null, '无此文档'));
        }
        let title = markdown.title;
        let content = markdown.content;
        res.set({
            "Content-type":"application/octet-stream",
            "Content-Disposition":"attachment;filename="+encodeURI(title+".md")
        });
        fReadStream = fs.createReadStream(content);
        fReadStream.on("data",(chunk) => res.write(chunk,"binary"));
        fReadStream.on("end",function () {
            res.end();
        });
    })
}
