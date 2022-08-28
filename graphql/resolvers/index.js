const postsResolvers = require('./posts')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const config = require('../../config')
const { UserInputError } = require('apollo-server')
const { validateRegisterInput } = require('../../util/validators')

module.exports = {
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      )
      if (!valid) {
        throw new UserInputError('Errors', errors)
      }
      const user = await User.find('username')
      if (user) {
        throw new UserInputError('User name is taken', {
          errors: {
            username: 'the username is taken'
          }
        })
      }
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
