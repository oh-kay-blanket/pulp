import React from 'react';
import { getRating } from './AppFunctions.js';

const Grid = ({ data, handleTileClick }) => {

    const bookGrid = data.map((book, index) => (<MainBox key={book.id} book={book} index={index} handleTileClick={handleTileClick} />));

    return(
        <div className='item-grid'>
            {bookGrid}
        </div>
    );
}


const MainBox = ({ index, book, handleTileClick }) => {
    const rating = <div className="rating-row">{getRating(book.grade)}</div>;

    return(
        <div className='main-box' onClick={() => handleTileClick(index, book.id)}>
            {book.image ? 
                <img className='img paper-stack' loading="lazy" alt='' src={book.image}></img> :
                <div className="book-placeholder paper-stack">
                    <div className="placeholder-title">{book.title}</div>
                    <div className="placeholder-author">{book.author}</div>
                </div>
            }
            <div className='item-info'>
                <h3 className="main-box-title">{book.title}</h3>
                <p><em>{book.author}</em></p>
                {rating}
            </div>
        </div>
    );
}

const GridSkeleton = () => {
    const items = Array.from({ length: 12 });
    return (
        <div className="item-grid skeleton-grid">
            {items.map((_, i) => {
                const duration = (Math.random() * 2 + 1).toFixed(2);
                return (
                    <div key={i} className="main-box skeleton-box">
                        <div 
                            className="skeleton-img" 
                            style={{ animationDuration: `${duration}s` }}
                        ></div>
                    </div>
                );
            })}
        </div>
    );
};

export default Grid;
export { GridSkeleton };
