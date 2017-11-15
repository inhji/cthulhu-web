import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import { GC_AUTH_TOKEN } from "./constants"

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHCOOL_ENDPOINT })

const middlewareLink = setContext(() => ({
  headers: {
    authorization: localStorage.getItem(GC_AUTH_TOKEN)
      ? `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}`
      : null
  }
}))

const link = middlewareLink.concat(httpLink)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default client
