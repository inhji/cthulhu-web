import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import App from './components/App'
import client from './apollo'
import registerServiceWorker from './registerServiceWorker'

const theme = createMuiTheme()

render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)

registerServiceWorker()
