var express = require('express');
var router = express.Router();

var userController = require('../controller/user');
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

// 注册
router.post('/reg', userController.reg);
// 登录
router.post('/login', userController.login);
// 登出
router.post('/logout', userController.logout);

// 新建md文件
router.post('/createMarkdown', userController.isLogin, markdownController.createMarkdown);
//保存文件
router.post('/saveMarkdown', userController.isLogin, markdownController.saveMarkdown);
//query文件
router.post('/queryMarkdownList', userController.isLogin, markdownController.queryMarkdownList);
//根据title获取文件内容
router.post('/getMarkdownById', userController.isLogin, markdownController.getMarkdownById);
//根据title删除文件
router.post('/deleteMarkdownById', userController.isLogin, markdownController.deleteMarkdownById);
//根据文件名下载文件
router.get('/downMarkdown', userController.isLogin, markdownController.downMarkdown);


module.exports = router;
