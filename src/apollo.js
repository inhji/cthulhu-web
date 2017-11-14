import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import { GC_AUTH_TOKEN } from "./constants"

const projectId = process.env.NODE_ENV === "production" ? "cthulhu-prod" : "cthulhu-devel"
const httpLink = new HttpLink({ uri: `https://api.graph.cool/simple/v1/${projectId}` })

const middlewareLink = setContext(() => ({
  headers: {
    authorization: `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}` || null
  }
}))

const link = middlewareLink.concat(httpLink)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

export default client
