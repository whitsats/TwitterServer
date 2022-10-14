import React from 'react'
import App from './App'
import {
  HttpLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client'
var abortController = new AbortController()
const link = new HttpLink({
  uri: 'http://localhost:5000',
  fetchOptions: {
    mode: 'cors',
    signal: abortController.signal
  }
})
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})
function Provider() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}
export default Provider
