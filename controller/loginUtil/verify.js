//验证用户登录
const JWT = require("../jwtUtil/JWT")
const { UserModule } = require("../../modules/index")

const verify = async (ctx) => {
  let token = ctx.header.authorization
  token = token.replace("Bearer", "")
  let result = JWT.verify(token)
  await UserModule.findOne({ _id: result._id })
    .then((rel) => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: "用户认证成功",
        }
      } else {
        ctx.body = {
          code: 500,
          msg: "用户认证失败",
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "用户认证失败",
      }
    })
}

module.exports = {
  verify,
}
