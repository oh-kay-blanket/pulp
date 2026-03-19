import React, {useState } from 'react';
import { getGrade } from './AppFunctions.js';
import { getBookCover } from './getBookCover';

const Grid = ({ data, handleTileClick }) => {

    const bookGrid = data.map((book, index) => (<MainBox key={book.id} book={book} index={index} handleTileClick={handleTileClick} />));
    
    return(
        <div className='item-grid'>
            {bookGrid}
        </div>
    );
}


const MainBox = ({ index, book, handleTileClick }) => {
    const coverSrc = getBookCover(book);

    const grade = <p className="grade">{getGrade(book.grade)}</p>;

    return(
        <div className='main-box' onClick={() => handleTileClick(index)}>
            <img className='img' loading="lazy" alt={book.title} src={coverSrc}></img>
            <div className='item-info'>
                <h3 className="main-box-title">{book.title}</h3>
                <p><em>{book.author}</em></p>
                {grade}
            </div>
        </div>
    );
}

export default Grid;
