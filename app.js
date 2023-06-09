const Koa = require("koa")
const app = new Koa()
const views = require("koa-views")
const json = require("koa-json")
const onerror = require("koa-onerror")
const bodyparser = require("koa-bodyparser")
const logger = require("koa-logger")
const mongooseConnect = require("./db")
const cors = require("koa2-cors")
const koajwt = require("koa-jwt")
const { verify } = require("./controller/loginUtil/verify")

//解决跨域
app.use(
  cors({
    exposeHeaders: ["WWW-Authenticate", "Authorization", "x-show-msg"],
    maxAge: 5, //  该字段可选，用来指定本次预检请求的有效期，单位为秒
    credentials: true, // 允许携带用户凭证
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // 允许的请求方法
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
    ], // 允许接收的头部字段
  })
)

//连接数据库
mongooseConnect()

// 配置jwt验证

app.use(
  koajwt({
    secret: "jianshu-server-jwt",
  }).unless({
    path: [/^\/users\/login/, /^\/users\/reg/, /^\/uploads\//],
  })
)

//引入路口文件
const index = require("./routes/index")
const users = require("./routes/users")
const upload = require("./routes/upload")
const article = require("./routes/article")
const comment = require("./routes/comment")
const fans = require("./routes/fans")

// error handler
onerror(app)

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
)
app.use(json())
app.use(logger())
app.use(require("koa-static")(__dirname + "/public"))

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(article.routes(), article.allowedMethods())
app.use(comment.routes(), comment.allowedMethods())
app.use(fans.routes(), fans.allowedMethods())

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx)
})

module.exports = app
