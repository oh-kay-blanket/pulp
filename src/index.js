import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HardcoverService } from './HardcoverService';

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

const Root = () => {
    const [books, setBooks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                const userId = await HardcoverService.getUserId();
                const fetchedBooks = await HardcoverService.getUserBooks(userId);
                setBooks(fetchedBooks);
            } catch (err) {
                console.error(err);
                setError('Failed to load library from Hardcover.');
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return <App bookList={books} loading={loading} error={error} />;
};

ReactDOM.render(<Root />, document.getElementById('root'));
