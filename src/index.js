import React from 'react';
import ReactDOM from 'react-dom';
import 'index.scss';
import Home from 'views/Home/Home';

import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
);
