var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var { Tag, Recpic } = require('../model.js');

mongoose.connect('mongodb://127.0.0.1:27017/photo-exhibiton')


// 获取所有标签列表
router.get("/getTagName", async function(req,res,next) {
  const doc = await Tag.find()
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


// 根据标签获取图片列表
router.get("/getPicByTag", async function(req,res,next) {
    let tagId = req.param("tagId");
    console.log(tagId);
    const doc = await Tag.find({_id:tagId}).populate('pictures').lean()
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

  // 获取推荐图片列表
router.get("/getRecpic", async function(req,res,next) {
    const doc = await Recpic.find()
    if(doc) {
        res.json({
            status:'0',
            msg:'1213',
            result:{
                count:doc.length,
                list:doc,
            }
        })
    }
  });

module.exports = router;
