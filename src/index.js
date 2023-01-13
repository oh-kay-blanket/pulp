import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './scss/style.scss';
import bookList from './books.json';

ReactDOM.render(<App bookList={bookList} />,document.getElementById('root'));
 