import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import booksData from './books.json';

import './scss/style.scss';

const Root = () => {
    return <App bookList={booksData} loading={false} error={null} />;
};

ReactDOM.render(<Root />, document.getElementById('root'));
