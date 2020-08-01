import React, {useState } from 'react';
import { getQuote, getGrade, setModalId } from './booksFunctions.js';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./img', false, /\.(png|jpe?g|svg)$/));

const BooksBox = ({ books, modalId, setModalId }) => {

  return(
    <div className='book-list'>
      {books.map((book) => (
        <div className='cell-parent' key={book.id} id={book.id}>
          <MainBox
            book={book}
            setModalId={setModalId}
          />
          {modalId == book.id &&
            <ModalWindow
              book={book}
              modalId={modalId}
              setModalId={setModalId}
            />
          }
        </div>
      ))}
    </div>
  );
}

const MainBox = ({ book, setModalId }) => {
  const imageSource = images[`${book.id}.jpg`];

  const divClick = event => {
    setModalId(event.currentTarget.parentNode.id);
  }

  return(
    <div className='main-box' onClick={divClick}>
      <img className='img' loading="lazy" alt='' src={imageSource}></img>
      <div id='book-info'>
        <p id="main-box-title">{book.title}</p>
        <p><i>{book.author}</i></p>
        {getGrade(book.grade)}
      </div>
    </div>
  );
}

const ModalWindow = ({ book, modalId, setModalId }) => {
  const imageSource = images[`${book.id}.jpg`];
  const imageId = `img${book.id}`;
  const modalDivId = `modal${book.id}`;

  const divClick = () => {
    setModalId('');
  }

  return (
    <div className='modal' id={modalDivId}>
      <div className="modal-table" onClick={divClick}>
        <div className="modal-cell">
          <img className="modal-content" alt='' src={imageSource} id={imageId}></img>
          <div className="caption">
            <p><b>Title:</b> {book.title}</p>
            <p><b>Author:</b> {book.author}</p>
            <p><b>Thoughts:</b> {book.description}</p>
            {getGrade(book.grade)}
            <p><b>Published:</b> {book.published}
            <b>&nbsp; &nbsp; &nbsp; Read:</b> {book.yearRead}</p>
            <p><b>Genre:</b> {book.genre.substr(0,1).toUpperCase()}{book.genre.substr(1)}</p>
            {getQuote(book.quote)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BooksBox;
