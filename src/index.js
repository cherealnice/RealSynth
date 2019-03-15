import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import store from './store';

const renderApp = () => {
  render(
    <App state={store.getState()} dispatch={store.dispatch} />,
    document.getElementById('root'),
  );
};

renderApp();
store.subscribe(renderApp);
