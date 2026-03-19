import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { getQuote, getGrade } from './AppFunctions.js';
import { getBookCover } from './getBookCover';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Modal = ({ data, modalId, slider, handleTileClick }) => {

    var sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                infinite: true,
                arrows: false,
                }
            },
        ]
    }

    const modalList = modalId !== "" && data.map((book) => (<ModalCell key={book.id} book={book} />));

    return (
        <div className={modalId === "" ? 'modal hidden': 'modal'}>
            <div id="modal-table" className="modal-table">
                <div className="icon icon-close" onClick={() => handleTileClick(0,"")}><i className="fa fa-times" aria-hidden="true"></i></div>
                <Slider ref={slider} {...sliderSettings}>
                    {modalList}
                </Slider>
            </div>
        </div>
    )
}

const ModalCell = ({ book }) => {
    const coverSrc = getBookCover(book);

    const grade = <span className="grade">{getGrade(book.grade)}</span>;

    return(
        <div className="modal-cell">
            <img loading="lazy" alt={book.title} src={coverSrc}></img>
            <div className="caption">
                <h2 className="modal__title">{book.title}{book.subtitle && <span className="modal__subtitle">: {book.subtitle}</span>}</h2>
                <h3 className="modal__author">{book.author}</h3>
                <p className="modal__genre">{book.genre.substr(0,1).toUpperCase()}{book.genre.substr(1)}</p>
                <p>Published: <b>{book.published}</b>&nbsp;&nbsp;&nbsp; Read: <b>{book.yearRead}</b>&nbsp;&nbsp;&nbsp; Grade: <b>{grade}</b></p>
                <p>{book.description}</p>
                {getQuote(book.quote)}
            </div>
        </div>
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }

export default Modal
