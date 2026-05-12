import React, { useState, useEffect, useRef } from "react";

import FunctionsBox from "./filter-sort";
import Grid, { GridSkeleton } from "./Grid";
import List from "./List";
import Modal from "./Modal";
import {
  handleSort,
  handleFilter,
  buildModalFunctionality,
} from "./AppFunctions.js";

const App = ({ bookList, loading, error }) => {
  // Set up state
  const [filterType, setFilterType] = useState("author");
  const [filterInput, setFilterInput] = useState("");
  const [sortDirection, setSort] = useState("rd-dsc");
  const [modalId, setModalId] = useState("");
  const [gridView, setGridView] = useState(true);

  // Process data if available
  let data = bookList
    ? bookList.filter((book) => book.grade !== "").slice()
    : [];

  // Body no scroll on modal
  modalId === ""
    ? document.body.classList.remove("modal-open")
    : document.body.classList.add("modal-open");

  // Run filter & sort if not loading
  if (!loading && bookList) {
    data = handleFilter(data, filterType, filterInput);
    handleSort(data, sortDirection);
  }

  // Modal listener
  buildModalFunctionality(setModalId);

  // Slick ref
  const slider = useRef(null);

  // Open Modal
  function handleTileClick(index, id = "open") {
    if (loading) return;
    setModalId(id);
    if (slider.current) {
      slider.current.slickGoTo(index, true);
    }
  }

  return (
    <>
      <h1>Pulp.</h1>
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

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <GridSkeleton />
      ) : gridView ? (
        <Grid data={data} handleTileClick={handleTileClick} />
      ) : (
        <List data={data} handleTileClick={handleTileClick} />
      )}

      {!loading && data.length > 0 && (
        <Modal
          data={data}
          slider={slider}
          handleTileClick={handleTileClick}
          modalId={modalId}
        />
      )}
    </>
  );
};

export default App;
