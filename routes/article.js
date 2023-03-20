const router = require("koa-router")()

const { articleControll } = require("../controller/article")

router.prefix("/article")

router.post("/add", articleControll.add)

router.get("/find",articleControll.find)
router.get("/findAll", articleControll.findAll)
router.get("/findOne", articleControll.findOne)
router.post("/update", articleControll.update)
router.post("/del", articleControll.del)

module.exports = router
