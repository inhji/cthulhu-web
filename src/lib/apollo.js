import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'
import introspectionQueryResultData from './fragmentTypes.json'
import { GC_AUTH_TOKEN } from './constants'

const httpLink = new HttpLink({ uri: 'https://api.inhji.de/graphql' })

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({
    headers: localStorage.getItem(GC_AUTH_TOKEN)
      ? { authorization: `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}` }
      : {}
  }))
  return forward(operation)
})

const link = authLink.concat(httpLink)

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({ fragmentMatcher })
})

export default client
