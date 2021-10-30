import React, {useState } from 'react';
import { getGrade } from './AppFunctions.js';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));

const Grid = ({ data, handleTileClick }) => {

    const bookGrid = data.map((book, index) => (<MainBox key={book.id} book={book} index={index} handleTileClick={handleTileClick} />));
    
    return(
        <div className='item-grid'>
            {bookGrid}
        </div>
    );
}


const MainBox = ({ index, book, handleTileClick }) => {
    book.image = images[`${book.id}.jpg`];
    
    const grade = <p className="grade">{getGrade(book.grade)}</p>;

    return(
        <div className='main-box' onClick={() => handleTileClick(index)}>
            <img className='img' loading="lazy" alt='' src={book.image}></img>
            <div className='item-info'>
                <h3 className="main-box-title">{book.title}</h3>
                <p><i>{book.author}</i></p>
                {grade}
            </div>
        </div>
    );
}

export default Grid;
