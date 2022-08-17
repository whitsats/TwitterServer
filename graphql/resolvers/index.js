const postsResolvers = require('./posts')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const config = require('../../config')

module.exports = {
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmpassword } },
      context,
      info
    ) {
      password = await bcrypt.hash(password, 12)
      const newUser = new User({
        email,
        username,
        password,
        creatAt: new Date().toISOString()
      })
      const res = await newUser.save()
      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username
        },
        config.SECRET_TOKEN,
        { expiresIn: '1h' }
      )

      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}
