import { createElement, render } from 'dio.js'
import App from './containers/App'
import store from './store'

const ConnectedApp = createElement(App, { state: store.getState() })

const renderApp = () => render(
  ConnectedApp,
  document.getElementById('root'),
)

renderApp()
store.subscribe(renderApp)
