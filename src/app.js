import React, { useState, useEffect, useRef } from 'react';

import FunctionsBox from './filter-sort';
import Grid from './Grid';
import List from './List';
import Modal from './Modal';
import { handleSort, handleFilter, buildModalFunctionality } from './AppFunctions.js';

const App = ({ bookList }) => {

    // Remove books without grades
    let data = bookList.filter(book => (book.grade !== '')).slice();

    // Set up state
    const [filterType, setFilterType] = useState('author');
    const [filterInput, setFilterInput] = useState('');
    const [sortDirection, setSort] = useState('asc');
    const [modalId, setModalId] = useState('');
    const [gridView, setGridView] = useState(true);
    const [currentItems, setCurrentItems] = useState(data);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 40;

    // Body no scroll on modal
    modalId === '' ? document.body.classList.remove('modal-open') : document.body.classList.add('modal-open');

    // Run filter & sort
    data = handleFilter(data, filterType, filterInput);
    handleSort(data, sortDirection);

    // Modal listener
    buildModalFunctionality(setModalId);

    // Slick ref
    const slider = useRef(null);
    
    // Open Modal
    function handleTileClick(index, id) {
        setModalId(id);
        slider.current.slickGoTo(index, true);
    }

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
                    handleTileClick={handleTileClick}
                /> :
                <List
                    data={data}
                    handleTileClick={handleTileClick}
                />
            }
            <Modal
                data={data}
                slider={slider}
                handleTileClick={handleTileClick}
                modalId={modalId}
            />
        </>
    )
}

export default App;
