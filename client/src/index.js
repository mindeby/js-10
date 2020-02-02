//Renders the App and all it's components to the page and imports the css syles
import React from 'react';
import ReactDOM from 'react-dom';

import './styles/global.css';

import { Provider } from './Context';
import App from './App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'));
