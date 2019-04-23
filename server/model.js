var mongoose = require('mongoose');

// 用户模型
const UserSchema = new mongoose.Schema(
    {   
        username:{ type: String },
        userpwd:{ type: String },
        email:{ type: String }
    }
)

UserSchema.virtual('pictures',{
    localField: '_id',
    ref:'Picture',
    foreignField:'author',
    justOne: false
})

const User = mongoose.model('User', UserSchema)


// 标签模型
const TagSchema = new mongoose.Schema(
    {  
        name:{ type: String }  
    }
)

TagSchema.virtual('pictures',{
    localField: '_id',
    ref:'Picture',
    foreignField:'tag',
    justOne: false
})

const Tag = mongoose.model('Tag', TagSchema)

// 图片模型
const Picture = mongoose.model('Picture', new mongoose.Schema({
    imgSrc: { type: String },
    detail: { type: String },
    commentList: [
        {
            username: { type: String },
            comment: { type: String }
        }
    ], 
    author:{ type: mongoose.SchemaTypes.ObjectId, ref: 'User'},
    tag:{ type: mongoose.SchemaTypes.ObjectId, ref: 'Tag'}
}))

// 推荐图片模型
const Recpic = mongoose.model('Recpic', new mongoose.Schema({
    imgSrc: { type: String },
    reson: { type: String }
}))

module.exports = { Picture, Tag, User, Recpic }