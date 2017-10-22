import { createElement, render } from 'dio.js'

import App from './containers/App'
import store from './store'

const ConnectedApp = () => (
  <App state={store.getState()} dispatch={store.dispatch} />
)

const renderApp = () => {
  render(
    ConnectedApp,
    document.getElementById('root'),
  )
}

renderApp()
store.subscribe(renderApp)
