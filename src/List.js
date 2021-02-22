import React, {useState } from 'react';
import { getQuote, getGrade, setModalId } from './AppFunctions.js';

const List = ({ data, modalId, setModalId }) => {

  const bookList = data.map((book) => (<ItemCell key={book.id} book={book} setModalId={setModalId} />));

  return(
    <div className='item-list'>
      {bookList}
    </div>
  );
}

const ItemCell = ({ book, setModalId }) => {


  return(
    <div className="list-item" onClick={() => setModalId(book.id)}>
        <h3>{book.title}</h3>
        <p><i>{book.author}</i></p>
    </div>
  );
}

export default List;
