import React, {useState } from 'react';
import { getQuote, getGrade, setModalId } from './AppFunctions.js';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));

const Grid = ({ data, modalId, setModalId }) => {

  const bookGrid = data.map((book) => (<MainBox key={book.id} book={book} setModalId={setModalId} />));
  
  return(
    <div className='item-grid'>
      {bookGrid}
    </div>
  );
}


const MainBox = ({ book, setModalId }) => {
  book.image = images[`${book.id}.jpg`];
  
  const grade = <p className="grade">{getGrade(book.grade)}</p>;

  return(
    <div className='main-box' onClick={() => setModalId(book.id)}>
      <img className='img' loading="lazy" alt='' src={book.image}></img>
      <div id='item-info'>
        <h3 id="main-box-title">{book.title}</h3>
        <p><i>{book.author}</i></p>
        {grade}
      </div>
    </div>
  );
}

export default Grid;
