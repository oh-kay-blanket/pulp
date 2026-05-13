# pulp
Every book I've ever read for pleasure.

This app now integrates with the [Hardcover.app](https://hardcover.app) GraphQL API to dynamically fetch library data.

## Setup

1.  **Hardcover API Key**: Obtain your API key from [hardcover.app/account/api](https://hardcover.app/account/api).
2.  **Environment Variables**: Create a `.env` file in the root directory based on `.env.example`:
    ```env
    HARDCOVER_API_KEY=Bearer your_token_here
    HARDCOVER_USERNAME=your_username
    ```
3.  **Install Dependencies**:
    ```bash
    npm install
    ```
4.  **Run Development Server**:
    ```bash
    npm run start
    ```

## Architecture Notes

- **Proxy**: Webpack Dev Server is configured to proxy `/hardcover` to `https://api.hardcover.app` to handle CORS during local development.
- **Node.js Compatibility**: The build scripts include `NODE_OPTIONS=--openssl-legacy-provider` for compatibility with Node.js 17+ and OpenSSL 3.0.
- **Fallback UI**: If a book is missing a cover image on Hardcover, a styled placeholder is generated using the book's title and author.
- **Loading State**: A skeleton grid with randomized pulse animations is displayed while the library data is being fetched.
