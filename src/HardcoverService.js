const API_URL = '/hardcover/v1/graphql';

async function fetchGraphQL(query, variables = {}) {
    console.log('Fetching Hardcover with query:', query.split('\n')[1].trim() + '...');
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.HARDCOVER_API_KEY
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    const result = await response.json();
    if (result.errors) {
        console.error('Hardcover GraphQL Errors:', JSON.stringify(result.errors, null, 2));
        throw new Error(`Hardcover API Error: ${result.errors[0].message}`);
    }
    return result.data;
}

export const HardcoverService = {
    async getUserId() {
        const data = await fetchGraphQL(`
            query GetMe {
                me {
                    id
                }
            }
        `);
        // Handle cases where 'me' might be an object or an array
        const me = Array.isArray(data.me) ? data.me[0] : data.me;
        if (!me) throw new Error('Could not identify user. Check your API key.');
        return me.id;
    },

    async getUserBooks(userId) {
        const query = `
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
        const data = await fetchGraphQL(query, { userId });
        
        return data.user_books.map((ub, index) => ({
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
    }
};
