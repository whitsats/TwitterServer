const postsResolvers = require('./posts')

module.exports = {
  Query: {
    ...postsResolvers.Query
  },
  Mutation: {
    register(
      _,
      { registerInput: { username, email, password, confirmpassword } },
      context,
      info
    ) {}
  }
}
