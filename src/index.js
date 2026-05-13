import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './scss/style.scss';

// Clear any old service workers that might be causing CORS/Network errors
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
            registration.unregister();
            console.log('ServiceWorker unregistered');
        }
    });
}

import booksData from './books.json';

const Root = () => {
    return <App bookList={booksData} loading={false} error={null} />;
};

ReactDOM.render(<Root />, document.getElementById('root'));
