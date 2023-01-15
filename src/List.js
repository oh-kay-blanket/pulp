import React, {useState } from 'react';
import { getQuote, getGrade, setModalId } from './AppFunctions.js';

const List = ({ data, handleTileClick }) => {

    const bookList = data.map((book, index) => (<ItemCell key={book.id} book={book} index={index} handleTileClick={handleTileClick} />));

    return(
        <div className='item-list'>
            {bookList}
        </div>
    );
}

const ItemCell = ({ index, book, handleTileClick }) => {


    return(
        <div className="list-item" onClick={() => handleTileClick(index)}>
                <h3>{book.title}</h3>
                <p><em>{book.author}</em></p>
        </div>
    );
}

export default List;
