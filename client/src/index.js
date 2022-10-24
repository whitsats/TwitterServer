import React from 'react'
import ReactDOM from 'react-dom/client'
import Provider from './ApolloProvider'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.Fragment>
    <Provider />
  </React.Fragment>
)
