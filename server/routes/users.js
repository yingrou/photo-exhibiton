var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var { User, Picture } = require('../model.js');

mongoose.connect('mongodb://127.0.0.1:27017/photo-exhibiton')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// 登陆
router.post("/login", function (req,res,next) {
    var param = {
        username:req.body.username,
        userpwd:req.body.userpwd
    }
    User.findOne(param, function (err,doc) {
        if(err){
            res.json({
                status:"1",
                msg:err.message
            });
        }else{
            if(doc){
                res.cookie("username",doc.username,{
                  path:'/',
                  maxAge:1000*60*60
                });
                res.json({
                    status:'0',
                    msg:'',
                    result:{
                      username:doc.username
                    }
                });
            }else {
              res.json({
                status:'1',
                msg:'账号或密码错误',
                result:''
            });
            }
        }
    });
  });

// 登出接口
router.post("/logout", function (req,res,next) {
    res.cookie("username","",{
      path:"/",
      maxAge:-1
    });
    res.json({
      status:"0",
      msg:'',
      result:''
    })
});

// 获取所有图片列表
router.get("/getPic", async function(req,res,next) {
  // res.send('hello,this is yoyo');
  const doc = await Picture.find().sort({'_id':-1}).populate('author')
  if(doc) {
      res.json({
          status:'0',
          msg:'',
          result:{
              count:doc.length,
              list:doc,
          }
      })
  }
});

// 获取用户图片列表
router.get("/getUserPic", async function(req,res,next) {
  // res.send('hello,this is yoyo');
  let name = req.cookies.username
  const doc = await User.find({username: name}).populate('pictures').lean()
  if(doc) {
      res.json({
          status:'0',
          msg:'',
          result:{
              count:doc.length,
              list:doc,
          }
      })
  }
});

// 注册用户
router.post("/addUser", async function(req,res,next) {
  // res.send('hello,this is yoyo');
  let newUser = {}
  newUser.username = req.body.username;
  newUser.userpwd = req.body.userpwd;
  newUser.email = req.body.email;
  let isExit = await User.find({username: newUser.username})
  if(isExit == false) {
    await User.insertMany([newUser]);
    res.json({
      status:'0',
      msg:'加入用户成功',
      result: ''
    })
  }else {
    res.json({
      status:'1',
      msg:'用户名已存在',
      result: ''
    })
  }
});

// 发布一张图片
router.post("/addPic", async function(req,res,next) {
  let newPic = {}
  newPic.imgSrc = req.body.imgSrc;
  newPic.detail = req.body.detail;
  let name = req.cookies.username

  // 先往图片库添加一张图片
  await Picture.insertMany([newPic]);
  const picInfo = await Picture.findOne({imgSrc: newPic.imgSrc});

  if(picInfo) {
    // 获取当前用户，往图片插入用户信息
    const userInfo = await User.findOne({username: name});
    picInfo.author = userInfo;
    await picInfo.save();
    res.json({
      status:'0',
      msg:'发布图片成功',
      result: ''
    })
  }else {
    res.json({
      status:'0',
      msg:'获取未插入图片信息，发布图片失败',
      result: ''
    })
  }
});

// 编辑图片简介
router.post("/editPicDetail", async function(req,res,next) {

  let newDetail = req.body.detail;
  let imgSrc = req.body.imgSrc;

  // 先从图片库找出该条数据
  const picInfo = await Picture.findOne({imgSrc: imgSrc});
  // 更改数据
  if(picInfo) {
    picInfo.detail = newDetail;
    await picInfo.save();
    res.json({
      status:'0',
      msg:'修改图片简介成功',
      result: ''
    })
  }

});

// 删除图片
router.post("/delectPic", async function(req,res,next) {
  // res.send('hello,this is yoyo');
  let id = req.body.id;
  Picture.remove({_id: id}, function(err,doc) {
    if(err) {
        res.json({
        status:'1',
        msg: err.message,
        result: ''
      })
    }else {
      res.json({
        status:'0',
        msg:'删除成功',
        result:''
      });
    }
  })
});

module.exports = router;
