const FansModule = require("../modules/fans")
const { ArticleModule } = require("../modules/index")

//添加评论
const FansControll = {
  follow: async (ctx) => {
    let fans = ctx.request.body
    await FansModule.create(fans)
      .then((rel) => {
        if (rel) {
          ctx.body = {
            code: 200,
            msg: "关注成功",
          }
        } else {
          ctx.body = {
            code: 300,
            msg: "关注失败",
          }
        }
      })
      .catch((err) => {
        ctx.body = {
          code: 500,
          msg: "关注时出现异常",
        }
      })
  },
  unfollow: async (ctx) => {
    let { username, author } = ctx.request.body
    await FansModule.findOneAndDelete({ username, author })
      .then((rel) => {
        if (rel) {
          ctx.body = {
            code: 200,
            msg: "取关成功",
          }
        } else {
          ctx.body = {
            code: 300,
            msg: "取关失败",
          }
        }
      })
      .catch((err) => {
        ctx.body = {
          code: 500,
          msg: "取关时出现异常",
        }
      })
  },
  //查询粉丝接口
  findAll: async (ctx) => {
    let { page, author } = ctx.query
    // 判断页码
    if (!page || isNaN(Number(page))) {
      page = 1
    } else {
      page = Number(page)
    }
    //每页条数
    let pageSize = 10
    //计算总页数
    let count = 0
    await FansModule.find({ author })
      .count()
      .then((rel) => {
        count = rel
      })
    let totalPage = 0
    if (count > 0) {
      totalPage = Math.ceil(count / pageSize)
    }
    if (totalPage > 0 && page > totalPage) {
      //给的页数超范围给最后一页反过来给第一页
      page = totalPage
    } else if (page < 1) {
      page = 1
    }
    await FansModule.find({ author })
      .skip((page - 1) / pageSize)
      .limit(pageSize)
      .then((rel) => {
        if (rel.length) {
          ctx.body = {
            code: 200,
            msg: "粉丝查询成功",
            data: rel,
            page,
            pageSize,
            count,
          }
        } else {
          ctx.body = {
            code: 300,
            msg: "没有查询到粉丝",
          }
        }
      })
      .catch((err) => {
        ctx.body = {
          code: 500,
          msg: "粉丝查询时出现异常",
          err,
        }
      })
  },
}

module.exports = FansControll
