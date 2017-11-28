import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';
import registerServiceWorker from './serviceWorkerDev.js';

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
  <DragDropContextProvider backend={HTML5Backend}>
    <Routes />
  </DragDropContextProvider>
  </Provider>,
  document.getElementById('app')
)
registerServiceWorker();
