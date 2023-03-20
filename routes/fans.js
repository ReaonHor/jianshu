const router = require("koa-router")()

const FansControll = require("../controller/fans")
router.prefix("/fans")

//点击关注
router.post("/follow", FansControll.follow)

//取消关注
router.post("/unfollow", FansControll.unfollow)
//查询关注登录用户的粉丝
router.get("/findAll", FansControll.findAll)
module.exports = router
