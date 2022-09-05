const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const { SECRET_TOKEN } = require('../../config')
const { UserInputError } = require('apollo-server')
const {
  validateRegisterInput,
  validateLoginInput
} = require('../../util/validators')

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    SECRET_TOKEN,
    { expiresIn: '1h' }
  )
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password)
      if (!valid) {
        throw new UserInputError('Errors', errors)
      }
      const user = await User.findOne({ username })
      if (!user) {
        errors.general = 'User not found'
        throw new UserInputError('User not found', { errors })
      }
      // 验证密码
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = 'Wrong credentials'
        throw new UserInputError('Wrong credentials', { errors })
      }
      const token = generateToken(user)
      return {
        ...user._doc,
        id: user._id,
        token
      }
    },
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
      const user = await User.findOne({ username })
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
      const token = generateToken(res)
      return {
        ...res._doc,
        id: res._id,
        token
      }
    }
  }
}
