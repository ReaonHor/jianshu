// 测试jsonwebtoken的加密解密算法
const jwt = require("jsonwebtoken")
const secret = "jianshu-server-jwt"
const JWT = {
  generate(value, expires) {
    return jwt.sign(value, secret, { expiresIn: expires })
  },
  verify(token) {
    try {
      return jwt.verify(token, secret)
    } catch (error) {
      return false
    }
  },
}

module.exports = JWT
