const router = require("koa-router")()

const { findByAuthor } = require("../controller/comment")
const CommentControll = require("../controller/comment")
router.prefix("/comment")

//添加评论
router.post("/add", CommentControll.add)

//前台查询评论
router.get("/web/find", CommentControll.findById)
//后台查询评论
router.get("/admin/find", CommentControll.findByAuthor)

module.exports = router
