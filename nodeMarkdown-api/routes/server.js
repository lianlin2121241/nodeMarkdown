var express = require('express');
var router = express.Router();

var userController = require('../controller/user');
var todoController = require('../controller/todo');
var markdownController = require('../controller/markdowndb');

router.all('*', function (req, res, next) {
    let allowOrigins = ['http://localhost:8081', 'http://127.0.0.1:8081', 'http://47.104.96.164'];
    if(allowOrigins.indexOf(req.headers.origin) === -1){
        next();
        return;
    }
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }else {
        next();
    }
});

// 新建md文件
router.post('/createMarkdown', markdownController.createMarkdown);
//保存文件
router.post('/saveMarkdown', markdownController.saveMarkdown);
//query文件
router.post('/queryMarkdownList', markdownController.queryMarkdownList);
//根据title获取文件内容
router.post('/getMarkdownByTitle', markdownController.getMarkdownById);
//根据title删除文件
router.post('/deleteMarkdownByTitle', markdownController.deleteMarkdownById);
//根据文件名下载文件
router.get('/downMarkdown', markdownController.downMarkdown);


module.exports = router;
