import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from "redux"
// import logger from 'redux-logger'
import thunk from 'redux-thunk'

import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import reducers from './reducers';
import { setDispatch } from './api/posts';
// import { inintFetch } from './api/github';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

setDispatch(store.dispatch)

// inintFetch(store.dispatch)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.register();
