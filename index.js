const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const config = require('./config')
const uri = config.MONGODB
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
