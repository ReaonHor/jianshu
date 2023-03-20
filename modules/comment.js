const mongoose = require("mongoose")
const schema = mongoose.Schema

const commentType = new schema({
  username: String,
  author: String,
  articleTitle: String,
  articleId: Number,
  content: String,
  creatTime: String,
})

const CommentModule = mongoose.model("comment", commentType)

module.exports = CommentModule
