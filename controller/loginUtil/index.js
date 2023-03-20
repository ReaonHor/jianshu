const JWT = require("../jwtUtil/JWT")

//登录校验
const login = (module, params, ctx) => {
  return module.findOne(params).then((rel) => {
    if (rel) {
      let token = JWT.generate(
        {
          username: rel.username,
          _id: rel._id,
        },
        3600 * 24 * 7
      )
      ctx.set("Authorization", token)
      ctx.body = {
        code: 200,
        msg: "登录成功",
      }
    } else {
      ctx.body = {
        code: 300,
        msg: "用户名或者密码错误",
      }
    }
  })
}
//注册
const reg = async (module, params, ctx) => {
  let isExist = false
  let { username, pwd } = params
  await module.findOne({ username }).then((rel) => {
    if (rel) {
      isExist = true
    }
  })
  if (isExist) {
    ctx.body = {
      code: 300,
      msg: "用户名存在",
    }
    return
  }
  await module
    .create({ username, pwd })
    .then((rel) => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: "注册成功",
        }
      } else {
        ctx.body = {
          code: 300,
          msg: "注册失败",
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "注册时出现异常",
        err,
      }
    })
}

//验证用户登录

const verify = async (module, ctx) => {
  let token = ctx.header.authorization
  token = token.replace("Bearer", "")
  let result = JWT.verify(token)
  await module
    .findOne({ _id: result._id })
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
  login,
  reg,
}
