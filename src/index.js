import React from "react"
import { render, hydrate } from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { ApolloProvider } from "react-apollo"
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles"

import App from "./components/App"
import client from "./apollo"
import registerServiceWorker from "./registerServiceWorker"

const theme = createMuiTheme()
const root = document.getElementById("root")

if (root.hasChildNodes()) {
  hydrate(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </ApolloProvider>
    </BrowserRouter>,
    root
  )
} else {
  render(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </ApolloProvider>
    </BrowserRouter>,
    document.getElementById("root")
  )
}

registerServiceWorker()
