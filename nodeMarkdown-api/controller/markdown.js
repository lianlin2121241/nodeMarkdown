var fs = require('fs');
var path = require('path'); 
var utils = require('../utils');

var fileBasePath = path.join(path.resolve(__dirname, '../'),'markdownFiles/');

/**
 * @desc 新建md文件
 * @param {object} newFile 
 */
module.exports.createMarkdown =function(req, res){
    let title = req.body.title;
    if (existsFileByTitle(title)) {
        res.json(utils.resultData(false,  null, '已有重名文件'));
        return;
    }
    fs.writeFile(path.join(path.resolve(__dirname, '../'),'markdownFiles/'+ title +'.md'), "", function(err) {
        if(err) {
            return console.log(err);
        }
        req.flash('success', '添加成功');
        res.json(utils.resultData(true,  null, '添加成功'));
        console.log("The file was saved!");
    });
}

/**
 * @desc 保存md文件
 */
module.exports.saveMarkdown =function(req, res){
    let title = req.body.title;
    let content = req.body.content;
    fs.writeFile(path.join(path.resolve(__dirname, '../'),'markdownFiles/'+ title +'.md'), content, function(err) {
        if(err) {
            return console.log(err);
        }
        req.flash('success', '保存成功');
        res.json(utils.resultData(true,  null, '保存成功'));
        console.log("The file was saved!");
    });
}

/**
 * @desc 查询文件列表
 */
module.exports.queryMarkdownList =function(req, res){
    let title = req.body.title;
    fs.readdir(fileBasePath, function(err,files){
        if(err) {
            return console.log(err);
        }
        let fileArr = [];
        files.forEach(function(file,index){
            let state = fs.statSync(fileBasePath+file);
            console.log(state);
            fileArr.push({
                name:file,
                size:state.size,
                mtime:state.mtime
            })
        })
        fileArr.sort((a,b)=>{
            return new Date(b.mtime).getTime() - new Date(a.mtime).getTime()
        })
        req.flash('success', '成功');
        res.json(utils.resultData(true,  fileArr, ''));
    })
}

/**
 * @desc 根据title获取文件内容
 */
module.exports.getMarkdownByTitle =function(req, res){
    let title = req.body.title;
    var data = fs.readFileSync(fileBasePath + title +'.md', 'utf8');
    req.flash('success', '成功');
    res.json(utils.resultData(true,  data, ''));
}

/**
 * @desc 根据title删除文件
 */
module.exports.deleteMarkdownByTitle =function(req, res){
    let title = req.body.title;
    if( fs.existsSync(fileBasePath + title +'.md') ) {
        fs.unlinkSync(fileBasePath + title +'.md');
        req.flash('success', '成功');
        res.json(utils.resultData(true,  '', '删除成功'));
    }else {
        res.json(utils.resultData(false,  '', '无此文件'));
    }
}

/**
 * @desc 根据文件名下载文件
 */
module.exports.downMarkdown = function(req, res){
    let fileName = req.query.fileName,
        currFile = fileBasePath + fileName,
        fReadStream;

    fs.exists(currFile,function(exist) {
        if(exist){
            res.set({
                "Content-type":"application/octet-stream",
                "Content-Disposition":"attachment;filename="+encodeURI(fileName)
            });
            fReadStream = fs.createReadStream(currFile);
            fReadStream.on("data",(chunk) => res.write(chunk,"binary"));
            fReadStream.on("end",function () {
                res.end();
            });
        }else{
            res.set("Content-type","text/html");
            res.send("file not exist!");
            res.end();
        }
    });
}

/**
 * @desc 根据title判断是否有重名文件
 */
function existsFileByTitle (title) {
    return fs.existsSync(fileBasePath + title +'.md')
}
