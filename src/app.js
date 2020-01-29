import React, {useState } from 'react';
import FunctionsBox from './filter-sort';
import BooksBox from './books';
import { handleSort, handleFilter, getQuote, getGrade, modalId, setModalId, buildModalFunctionality } from './booksFunctions.js';

const App = ({ bookList }) => {

  // Remove books without grades
  let books = bookList.filter(book => (book.grade !== '')).slice();

  // Set up state
  const [filterType, setFilterType] = useState('author');
  const [filterInput, setFilterInput] = useState('');
  const [sortDirection, setSort] = useState('asc');
  const [modalId, setModalId] = useState('');

  // Run filter & sort
  books = handleFilter(books, filterType, filterInput);
  handleSort(books, sortDirection);

  // Modal listener
  buildModalFunctionality(setModalId);

  return(
    <>
      <FunctionsBox
        filterType={filterType}
        setFilterType={setFilterType}
        filterInput={filterInput}
        setFilterInput={setFilterInput}
        sortDirection={sortDirection}
        setSort={setSort}
      />
      <BooksBox
        books={books}
        modalId={modalId}
        setModalId={setModalId}
      />
    </>
  )
}

export default App;
