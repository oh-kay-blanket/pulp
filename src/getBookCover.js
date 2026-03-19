function importAll(r) {
    let images = {};
    r.keys().map((item) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const localImages = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));

export function getBookCover(book) {
    if (book.isbn) {
        return `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;
    }

    const localKey = `${book.id}.jpg`;
    if (localImages[localKey]) {
        return localImages[localKey];
    }

    return null;
}
