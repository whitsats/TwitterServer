const { gql } = require('apollo-server')
const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
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
  }
`
module.exports = typeDefs
