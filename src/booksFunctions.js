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
  // sort results
  books.sort(function(a,b) {
    return a.published - b.published;
  });
}

const yrDsc = books => {
  // sort results
  books.sort(function(a,b) {
    return b.published - a.published;
  });
}

const rdAsc = books => {
  // sort results
  books.sort(function(a,b) {
    return a.yearOrder - b.yearOrder;
  });

  books.sort(function(a,b) {
    return a.yearRead - b.yearRead;
  });
}

const rdDsc = books => {
  // sort results
  books.sort(function(a,b) {
    return b.yearOrder - a.yearOrder;
  });

  books.sort(function(a,b) {
    return b.yearRead - a.yearRead;
  });
}

const grAsc = books => {
  // sort results
  books.sort(function(a,b) {
    return a.grade - b.grade;
  });
}

const grDsc = books => {
  // sort results
  books.sort(function(a,b) {
    return b.grade - a.grade;
  });
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
  return (quote === '' ? '' : <p><b>Favorite Quote:</b> {quote}</p>)
};

const getGrade = grade => {
  grade = +grade;
  return (grade === 0 ? '' : <p><b>Rating:</b> {grade.toPrecision(2)}</p>)
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

export { handleFilter, handleSort, getQuote, getGrade, buildModalFunctionality };
