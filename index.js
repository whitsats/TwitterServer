const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const uri =
  'mongodb+srv://whitsats:whitsats003929@cluster0.sm7fxnn.mongodb.net/backend?retryWrites=true&w=majority'
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})
mongoose
  .connect(uri, options)
  .then(() => {
    console.log('mongodb connected')
    return server.listen({ port: 5000 })
  })
  .then(res => {
    console.log(`Server running at ${res.url}`)
  })
