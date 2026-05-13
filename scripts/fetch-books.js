const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const API_KEY = process.env.HARDCOVER_API_KEY;
const API_URL = 'https://api.hardcover.app/v1/graphql';

const query = `
    query GetMe {
        me {
            id
        }
    }
`;

const booksQuery = `
    query GetUserBooks($userId: Int!) {
        user_books(where: { user_id: { _eq: $userId }, status_id: { _eq: 3 } }) {
            rating
            last_read_date
            review
            book {
                id
                title
                subtitle
                description
                release_date
                image {
                    url
                }
                contributions {
                    author {
                        name
                    }
                }
                taggable_counts(
                    where: { tag: { tag_category: { slug: { _eq: "genre" } } } }
                    order_by: { count: desc }
                    limit: 1
                ) {
                    tag {
                        tag
                    }
                }
            }
        }
    }
`;

async function fetchGraphQL(query, variables = {}) {
    const response = await axios.post(API_URL, {
        query,
        variables
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': API_KEY
        }
    });

    if (response.data.errors) {
        throw new Error(JSON.stringify(response.data.errors));
    }
    return response.data.data;
}

async function run() {
    try {
        console.log('Fetching user ID...');
        const meData = await fetchGraphQL(query);
        const userId = meData.me[0]?.id || meData.me?.id;
        
        if (!userId) throw new Error('User ID not found');

        console.log(`Fetching books for user ${userId}...`);
        const booksData = await fetchGraphQL(booksQuery, { userId });
        
        const books = booksData.user_books.map((ub, index) => ({
            id: ub.book?.id?.toString() || index.toString(),
            title: ub.book?.title || 'Unknown Title',
            subtitle: ub.book?.subtitle || '',
            author: ub.book?.contributions?.[0]?.author?.name || 'Unknown Author',
            grade: ub.rating ? ub.rating.toString() : '',
            image: ub.book?.image?.url || '',
            description: ub.book?.description || '',
            yearRead: ub.last_read_date ? new Date(ub.last_read_date).getFullYear().toString() : '',
            yearOrder: index.toString(),
            published: ub.book?.release_date ? new Date(ub.book.release_date).getFullYear().toString() : '',
            genre: ub.book?.taggable_counts?.[0]?.tag?.tag || '',
            quote: ub.review || ''
        }));

        console.log(`Successfully fetched ${books.length} books.`);
        
        const outputPath = path.resolve(__dirname, '../src/books.json');
        fs.writeFileSync(outputPath, JSON.stringify(books, null, 2));
        console.log(`Saved data to ${outputPath}`);

    } catch (err) {
        console.error('Error during build-time fetch:', err.message);
        process.exit(1);
    }
}

run();
