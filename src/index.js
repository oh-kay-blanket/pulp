import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

import './style.css';
import bookList from './books.csv';

ReactDOM.render(
  <App bookList={bookList} />,
  document.getElementById('root')
);
