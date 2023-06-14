import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';
import App from './App';
import  IntlProviderWrapper from "./hoc/IntlProviderWrapper";

import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <IntlProviderWrapper>
        <App persistor={persistor}/>
      </IntlProviderWrapper>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
