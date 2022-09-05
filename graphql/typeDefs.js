const { gql } = require('apollo-server')
const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createAt: String!
    username: String!
    comments: [Comment]!
    likes: [like]!
  }
  type Comment {
    id: ID!
    body: String!
    username: String!
    createAt: String!
  }
  type Like {
    id: ID!
    username: String!
    createAt: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type User {
    username: String!
    password: String!
    email: String!
    createAt: String
    token: String!
  }
  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`
module.exports = typeDefs
