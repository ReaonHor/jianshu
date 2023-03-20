const router = require("koa-router")()
const fs = require("fs")
const multer = require("@koa/multer")
const path = require("path")
router.prefix("/upload")
let storage = multer.diskStorage({
  //设置文件存储的位置
  destination: function (req, file, cb) {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let dir = "./public/uploads/" + year + month + day
    //判断目录是否存在
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      })
    }
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    //设置上传的文件名称
    let fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    cb(null, fileName)
  },
})
let upload = multer({ storage })
router.post("/img", upload.single("myfile"), async (ctx) => {
  //向客户端返回存储的路径
  let filepath = ctx.file.path
  let fileUrl = `${ctx.origin}${filepath}`.replace("public", "")
  ctx.body = {
    data: fileUrl,
  }
})

//富文本编辑器上传图片
router.post("/editor/img", upload.single("editorFile"), (ctx) => {
  let filepath = ctx.file.path
  let fileUrl = `${ctx.origin}${filepath}`.replace("public", "")
  ctx.body = {
    errno: 0,
    data: [
      {
        url: fileUrl,
        alt: "",
        href: "",
      },
    ],
  }
})

module.exports = router
