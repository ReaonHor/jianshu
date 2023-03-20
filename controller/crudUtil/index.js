//封装增删改查的代码
/**
 * 用于添加数据的公共方法
 * @param {*} model
 * @param {*} params
 * @param {*} ctx
 * @returns
 */
const add = (model, params, ctx) => {
  return model
    .create(params)
    .then((rel) => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: "添加成功",
          data: rel,
        }
      } else {
        ctx.body = {
          code: 300,
          msg: "添加失败",
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "添加时出现异常",
      }
      console.error(err) //控制台红色提醒，但不影响程序进行
    })
}
/**
 * 用于修改资料的方法
 * @param {*} module
 * @param {*} where
 * @param {*} params
 * @param {*} ctx
 * @returns
 */
const update = (module, where, params, ctx) => {
  return module
    .updateOne(where, params)
    .then((rel) => {
      console.log(rel)
      if (rel.matchedCount > 0) {
        ctx.body = {
          code: 200,
          msg: "资料修改成功",
        }
      } else {
        ctx.body = {
          code: 300,
          msg: "资料修改失败",
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 400,
        msg: "修改时出现异常",
      }
      console.error(err)
    })
}

//修改用户密码
const updateOne = (model, params, ctx) => {
  return model
    .updateOne({ ...params })
    .then((rel) => {
      if (rel.n > 0) {
        ctx.body = {
          code: 200,
          msg: "修改成功",
        }
      } else {
        ctx.body = {
          code: 300,
          msg: "修改错误",
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "修改密码时出现异常",
      }
    })
}

/**删除数据
 *找到一个并且删除
 * @param {*} module
 * @param {*} where
 * @param {*} ctx
 */
const del = (module, where, ctx) => {
  //这里一定要返回否则会当成同步处处理
  return module
    .findOneAndDelete(where)
    .then((rel) => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: "文章删除成功",
        }
      } else {
        ctx.body = {
          code: 300,
          msg: "文章删除失败",
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "文章删除时出现异常",
      }
      console.error(err)
    })
}

/**
 * 用于查询的方法
 * @param {*} model
 * @param {*} where
 * @param {*} ctx
 * @returns
 */
const find = (model, where, ctx) => {
  return model
    .findOne(where)
    .then((rel) => {
      if (rel) {
        ctx.body = {
          code: 200,
          msg: "资料查询成功",
          data: rel,
        }
      } else {
        ctx.body = {
          code: 300,
          msg: "资料查询失败",
        }
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 500,
        msg: "查询时出现异常",
      }
      console.error(err)
    })
}

module.exports = {
  find,
  add,
  update,
  del,
  updateOne,
}
