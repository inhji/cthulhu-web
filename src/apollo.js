import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { GC_AUTH_TOKEN } from './constants'

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHCOOL_ENDPOINT })

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({
    headers: localStorage.getItem(GC_AUTH_TOKEN)
      ? { authorization: `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}` }
      : {}
  }))
  return forward(operation)
})

const link = authLink.concat(httpLink)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default client
