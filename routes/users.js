const router = require("koa-router")()
const { userControll } = require("../controller/user")
router.prefix("/users")

//登录校验
router.post("/login", userControll.userLogin)
//注册
router.post("/reg", userControll.userReg)

//修改密码
router.post("/update/pwd", userControll.userUpdatePwd)

//修改个人资料
router.post("/update/personal", userControll.updatePersonal)

//添加系统用户
router.post("/add", userControll.userAdd)

//删除系统用户
router.post("/del", userControll.userDel)

//查询系统用户
router.post("/find", userControll.userFind)
//查询单个用户
router.get("/find/:id", userControll.userFindOne)

//验证用户登录

module.exports = router
