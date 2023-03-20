const CommentModule = require("../modules/comment")
const { ArticleModule } = require("../modules/index")

//添加评论
const CommentControll = {
  add: async (ctx) => {
    let comment = ctx.request.body
    let isComment = false
    await Comment.create(comment)
      .then((rel) => {
        if (rel) {
          isComment = true
          ctx.body = {
            code: 200,
            msg: "评论发布成功",
          }
        } else {
          ctx.body = {
            code: 300,
            msg: "评论发布失败",
          }
        }
      })
      .catch((err) => {
        ctx.body = {
          code: 500,
          msg: "评论发布时出现异常",
        }
      })
    if (isComment) {
      await ArticleModule.updateOne({ id }, { $inc: { comment: 1 } })
    }
  },
  //前台查询评论
  findById: async (ctx) => {
    let { id } = ctx.query
    await CommentModule.find({ article: id })
      .then((rel) => {
        if (rel && rel.length > 0) {
          ctx.body = {
            code: 200,
            msg: "评论查询成功",
            data: rel,
          }
        } else {
          ctx.body = {
            code: 300,
            msg: "评论查询失败",
          }
        }
      })
      .catch((err) => {
        ctx.body = {
          code: 500,
          msg: "评论查询时出现异常",
          err,
        }
      })
  },
  //后台评论查询,根据文章作者查询
  findByAuthor: async (ctx) => {
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
    await CommentModule.find({ author })
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
    await CommentModule.find({ author })
      .skip((page - 1) / pageSize)
      .limit(pageSize)
      .then((rel) => {
        if (rel.length) {
          ctx.body = {
            code: 200,
            msg: "评论查询成功",
            data: rel,
            page,
            pageSize,
            count,
          }
        } else {
          ctx.body = {
            code: 300,
            msg: "没有查询到评论",
          }
        }
      })
      .catch((err) => {
        ctx.body = {
          code: 500,
          msg: "评论查询时出现异常",
          err,
        }
      })
  },
}

module.exports = CommentControll
