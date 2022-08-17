const { model, Schema } = require('mongoose')
const postSchema = new Schema({
  body: String,
  username: String,
  createAt: String,
  comments: [
    {
      body: String,
      username: String,
      createAt: String
    }
  ],
  likes: [
    {
      username: String,
      createAt: String
    }
  ],
  //user 的id为Schema的id，可以用type属性定义。同时，ref表示引用谁的id，字符串会自动转换大小写。
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

module.exports = model('Post', postSchema)
