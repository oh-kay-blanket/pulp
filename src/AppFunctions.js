import React from 'react';

// Filter & sort
const handleFilter = (books, filterType, filterInput) => {
    switch(filterType) {
        case 'author':
            return books.filter(book => (book.author.toUpperCase().includes(filterInput.toUpperCase())));
        case 'title':
            return books.filter(book => (book.title.toUpperCase().includes(filterInput.toUpperCase())));
        case 'genre':
            return books.filter(book => (book.genre.toUpperCase().includes(filterInput.toUpperCase())));
        default:
    }
}

const yrAsc = books => {
    books.sort((a, b) => a.published - b.published);
}

const yrDsc = books => {
    books.sort((a, b) => b.published - a.published);
}

const rdAsc = books => {
    books.sort((a, b) => {
        if (a.yearRead !== b.yearRead) {
            return a.yearRead - b.yearRead;
        }
        return a.yearOrder - b.yearOrder;
    });
}

const rdDsc = books => {
    books.sort((a, b) => {
        if (b.yearRead !== a.yearRead) {
            return b.yearRead - a.yearRead;
        }
        return b.yearOrder - a.yearOrder;
    });
}

const grAsc = books => {
    books.sort((a, b) => a.grade - b.grade);
}

const grDsc = books => {
    books.sort((a, b) => b.grade - a.grade);
}

const handleSort = (books, sortDirection) => {
    switch(sortDirection) {
        case 'yr-asc':
            yrAsc(books);
            break;
        case 'yr-dsc':
            yrDsc(books);
            break;
        case 'rd-asc':
            rdAsc(books);
            break;
        case 'rd-dsc':
            rdDsc(books);
            break;
        case 'gr-asc':
            grAsc(books);
            break;
        case 'gr-dsc':
            grDsc(books);
            break;
        default:
            break;
    }
}

const getQuote = quote => {
    if (!quote) return null;
    
    // If it looks like HTML, render it as such
    if (quote.includes('<') && quote.includes('>')) {
        return <div className="modal__quote" dangerouslySetInnerHTML={{ __html: quote }} />;
    }
    
    return <p className="modal__quote">"{quote}"</p>;
};

const getGrade = grade => {
    grade = +grade;
    return (grade === 0 ? '' : grade.toPrecision(2))
};


// Modal
const buildModalFunctionality = (setModalId) => {
    // Keypress listener
    document.addEventListener("keydown", function(event) {
        if(event.which === 27){
            setModalId('');
        }
    });
}

export { handleFilter, getGrade, getQuote, handleSort, buildModalFunctionality };
