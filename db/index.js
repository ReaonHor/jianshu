const mongoose = require('mongoose')

module.exports = ()=> {
	mongoose.connect('mongodb://127.0.0.1:27017/jianshu')
	.then(() => {
		console.log('数据库连接成功!')
	}).catch(err => {
		console.log('数据库连接失败',err)
	})
}