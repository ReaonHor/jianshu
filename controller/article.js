const { ArticleModule } = require("../modules/index")
const crud = require("./crudUtil/index")

const articleControll = {
  find: async (ctx) => {
    await ArticleModule.find()
      .sort({ id: -1 })
      .then((rel) => {
        if (rel) {
          ctx.body = {
            code: 200,
            msg: "查询所有文章成功",
            data: rel,
          }
        } else {
          ctx.body = {
            code: 300,
            msg: "查询所有文章失败",
          }
        }
      })
      .catch((err) => {
        ctx.body = {
          code: 500,
          msg: "查询时出现异常",
          err,
        }
      })
  },
  add: async (ctx) => {
    let article = ctx.request.body
    console.log(ctx.request.body)
    await crud.add(ArticleModule, article, ctx)
  },
  //查询所有文章
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
    await ArticleModule.find({ author })
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
    await ArticleModule.find({ author })
      .skip((page - 1) / pageSize)
      .limit(pageSize)
      .then((rel) => {
        if (rel.length) {
          ctx.body = {
            code: 200,
            msg: "文章查询成功",
            data: rel,
            page,
            pageSize,
            count,
          }
        } else {
          ctx.body = {
            code: 300,
            msg: "没有查询到文章",
          }
        }
      })
      .catch((err) => {
        ctx.body = {
          code: 500,
          msg: "文章查询时出现异常",
        }
      })
  },
  //查询单个文章
  findOne: async (ctx) => {
    let { id } = ctx.query
    let isRead = false
    await ArticleModule.findOne({ id })
      .then((rel) => {
        if (rel) {
          isRead = true
          ctx.body = {
            code: 200,
            msg: "文章查询成功",
            data: rel,
          }
        } else {
          ctx.body = {
            code: 300,
            msg: "文章查询失败",
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
    if (isRead) {
      await ArticleModule.updateOne({ id }, { $inc: { read: 1 } })
    }
  },
  //修改文章信息
  update: async (ctx) => {
    let article = ctx.request.body
    await ArticleModule.updateOne(
      { id: article.id },
      {
        title: article.title,
        stemform: article.stemform,
        content: article.content,
      }
    )
      .then((rel) => {
        if (rel.matchedCount > 0) {
          ctx.body = {
            code: 200,
            msg: "文章更新成功",
          }
        } else {
          ctx.body = {
            code: 300,
            msg: "文章更新失败",
          }
        }
      })
      .catch((err) => {
        ctx.body = {
          code: 500,
          msg: "文章更新时出现异常",
          err,
        }
      })
  },
  //删除文章
  del: async (ctx) => {
    let { id } = ctx.request.body
    await crud.del(ArticleModule, { id }, ctx)
  },
}

module.exports = {
  articleControll,
}
