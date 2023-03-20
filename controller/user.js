const { UserModule } = require("../modules/index")
const crud = require("./crudUtil/index")
const { login, reg, verify } = require("./loginUtil/index")

const userControll = {
  //登录校验
  userLogin: async (ctx) => {
    let { username, pwd } = ctx.request.body
    await login(UserModule, { username, pwd }, ctx)
  },
  //注册
  userReg: async (ctx) => {
    let { username, pwd } = ctx.request.body
    await reg(UserModule, { username, pwd }, ctx)
  },

  //修改用户密码
  userUpdatePwd: async (ctx) => {
    let { username, pwd } = ctx.request.body
    await crud.updateOne(UserModule, { username: username, pwd: pwd }, ctx)
  },

  //添加系统用户
  userAdd: async (ctx) => {
    const { username, pwd } = ctx.request.body
    await crud.add(UserModule, { username, pwd }, ctx)
  },

  //登录校验
  userVerify: async (ctx) => {
    await verify(UserModule, ctx)
  },

  //修改个人资料
  updatePersonal: async (ctx) => {
    let {
      username,
      avatar = "",
      sex = "",
      desc = "",
      phone = "",
      email = "",
    } = ctx.request.body
    await crud.update(
      UserModule,
      { username },
      {
        username,
        avatar,
        sex,
        desc,
        phone,
        email,
      },
      ctx
    )
  },
  //修改系统用户
  // userUpdate: async (ctx) => {
  //   let params = ctx.request.body
  //   await crud.update(
  //     UserModule,
  //     { _id: params._id },
  //     { username: params.username, pwd: params.pwd },
  //     ctx
  //   )
  // },
  //删除系统用户
  userDel: async (ctx) => {
    let { _id } = ctx.request.body
    await crud.del(UserModule, _id, ctx)
  },
  //查询系统用户
  userFind: async (ctx) => {
    const { username } = ctx.request.body
    await crud.find(UserModule, { username }, ctx)
  },
  //查询单个系统用户
  userFindOne: async (ctx) => {
    await crud.findOne(UserModule, { _id: ctx.params.id }, ctx)
  },
}

module.exports = {
  userControll,
}
