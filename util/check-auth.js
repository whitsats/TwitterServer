const jwt = require('jsonwebtoken')
const { SECRET_TOKEN } = require('../config')
const { AuthenticationError } = require('apollo-server')
module.exports = context => {
  const authHeader = context.req.authorization
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1]
    if (token) {
      // 验证token
      try {
        // 返回值为定义token时传入的对象，用秘钥进行验证，如果过期或者不正确，则抛出异常
        const user = jwt.verify(token, SECRET_TOKEN)
        return user
      } catch (err) {
        // 业务上的错误
        throw new AuthenticationError('Invalid/Expired token')
      }
    }
    // token 不合法
    throw new Error("Authentication token must be 'Bearer [token]'")
  }
  // token 不存在
  throw new Error('Authentication header must be provided')
}
