import React, { useState, useEffect } from 'react';

import FunctionsBox from './filter-sort';
import Grid from './Grid';
import List from './List';
import Modal from './Modal';
import { handleSort, handleFilter, getQuote, getGrade, modalId, setModalId, buildModalFunctionality } from './AppFunctions.js';

const App = ({ bookList }) => {

  // Remove books without grades
  let data = bookList.filter(book => (book.grade !== '')).slice();

  // Set up state
  const [filterType, setFilterType] = useState('author');
  const [filterInput, setFilterInput] = useState('');
  const [sortDirection, setSort] = useState('asc');
  const [modalId, setModalId] = useState('');
  const [gridView, setGridView] = useState(true);

  // Run filter & sort
  data = handleFilter(data, filterType, filterInput);
  handleSort(data, sortDirection);

  // Modal listener
  buildModalFunctionality(setModalId);

  return(
    <>
      <h1>pulp</h1>
      <FunctionsBox
        filterType={filterType}
        setFilterType={setFilterType}
        filterInput={filterInput}
        setFilterInput={setFilterInput}
        sortDirection={sortDirection}
        setSort={setSort}
        gridView={gridView}
        setGridView={setGridView}
      />
      {gridView ?
        <Grid
          data={data}
          modalId={modalId}
          setModalId={setModalId}
        /> :
        <List
          data={data}
          modalId={modalId}
          setModalId={setModalId}
        />
      }
      {modalId !== '' &&
        <Modal
          data={data}
          modalId={modalId}
          setModalId={setModalId}
        />
      }
    </>
  )
}

export default App;
