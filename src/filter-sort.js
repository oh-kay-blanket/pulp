import React, {useState } from 'react';

const FunctionsBox = ({ filterType, setFilterType, filterInput, setFilterInput, sortDirection, setSort, gridView, setGridView }) => {

  return(
    <div className='functions-box'>
      <FilterBox
        filterType={filterType}
        setFilterType={setFilterType}
        filterInput={filterInput}
        setFilterInput={setFilterInput}
      />
      <SortBox
        sortDirection={sortDirection}
        setSort={setSort}
      />
      <div className="display-select">
          <div className={gridView && `active`} onClick={() => setGridView(true)}>
            <i className="fa fa-th-large"></i>
          </div>

          <div className={!gridView && `active`} onClick={() => setGridView(false)}>
            <i className="fa fa-list"></i>
          </div>
        </div>
    </div>
  )
}

const FilterBox = ({ filterType, setFilterType, filterInput, setFilterInput }) => {

  const handleType = event => {
    setFilterType(event.target.value);
  }

  const handleInput = event => {
    setFilterInput(event.target.value);
  }

  return (
    <div className='filter-box'>
      <p>
        <i className="fas fa-filter"></i>
        <select onChange={handleType}>
          <option value='author'>Author</option>
          <option value='title'>Title</option>
          <option value='genre'>Genre</option>
        </select>

        <input
          className='input-box'
          type="text"
          placeholder='Query'
          value={filterInput}
          onChange={handleInput}
          autoFocus
        /></p>
    </div>
  )
}

const SortBox = ({ sortDirection, setSort }) => {

  const handleChange = event => {
    setSort(event.target.value);
  }

  return (
    <div className='sort-box'>
      <p>
        <i className="fas fa-sort"></i>
        <select onChange={handleChange}>
          <option value='rd-dsc'>Yr Read &#8595;</option>
          <option value='rd-asc'>Yr Read &#8593;</option>
          <option value='gr-dsc'>Rating &#8595;</option>
          <option value='gr-asc'>Rating &#8593;</option>
          <option value='yr-dsc'>Yr Pub &#8595;</option>
          <option value='yr-asc'>Yr Pub &#8593;</option>
        </select>
      </p>
    </div>
  )
}

export default FunctionsBox;
