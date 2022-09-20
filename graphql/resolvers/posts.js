const Post = require('../../models/Post')
const checkAuth = require('../../util/check-auth')
module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createAt: -1 })
        return posts
      } catch (err) {
        throw new Error(err)
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId)
        if (post) {
          return post
        } else {
          throw new Error('Post not found')
        }
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  Mutations: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context)
      const newPost = new Post({
        body,
        username: user.username,
        createAt: new Date().toISOString(),
        user: user.id
      })
      const post = await newPost.save()
      return post
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context)
      if (user.username === post.username) {
        try {
          const post = await Post.findById(postId)
          await post.deleteOne()
          return 'Post deleted successfully'
        } catch (err) {
          throw new Error(err)
        }
      } else {
        throw new AuthenticationError('Action not allowed')
      }
    }
  }
}
