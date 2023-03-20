const mongoose = require("mongoose")
const schema = mongoose.Schema

//创造用户模型对象
const UserType = new schema({
  username: String,
  pwd: {
    type: String,
    select: false,
  },
  avatar: {
    type: String,
    default: "",
  },
  sex: {
    type: String,
    default: "",
  },
  desc: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
})
const UserModule = mongoose.model("user", UserType)
//创造文章模型对象
const ArticleType = new schema({
  id: Number,
  title: String,
  createTime: String,
  content: String,
  stemfrom: String,
  read: {
    type: Number,
    default: 0,
  },
  star: {
    type: Number,
    default: 0,
  },
  comment: {
    type: Number,
    default: 0,
  },
  author: String,
})
const ArticleModule = mongoose.model("article", ArticleType)
module.exports = {
  UserModule,
  ArticleModule,
}
