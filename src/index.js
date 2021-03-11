import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store/store';
import App from './components/App';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';

import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <BreadcrumbsProvider>
      <App />
    </BreadcrumbsProvider>
  </Provider>,
  document.getElementById('root')
);
