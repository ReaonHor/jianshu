const mongoose = require("mongoose")
const schema = mongoose.Schema

const FansType = new schema({
  username: String,
  author: String,
  creatTime: String,
})

const FansModule = mongoose.model("fan", FansType)

module.exports = FansModule
