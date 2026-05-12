import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { getQuote, getGrade } from './AppFunctions.js';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Modal = ({ data, modalId, slider, handleTileClick }) => {

    var sliderSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        adaptiveHeight: false,
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
                <div className="icon-close" onClick={() => handleTileClick(0, "")}>
                    <span>X</span>
                </div>
                {modalId !== "" && (
                    <Slider ref={slider} {...sliderSettings}>
                        {modalList}
                    </Slider>
                )}
            </div>
        </div>
    )
}

const ModalCell = ({ book }) => {

    const grade = <span className="grade">{getGrade(book.grade)}</span>;

    return(
        <div className="modal-cell">
            {book.image ? 
                <img loading="lazy" alt='' src={book.image}></img> :
                <div className="book-placeholder">
                    <div className="placeholder-title">{book.title}</div>
                    <div className="placeholder-author">{book.author}</div>
                </div>
            }
            <div className="caption">
                <h2 className="modal__title">
                    {book.title}
                    {book.subtitle && <span className="modal__subtitle">{book.subtitle}</span>}
                </h2>
                <h3 className="modal__author">by {book.author}</h3>
                {book.genre && <span className="modal__genre">{book.genre}</span>}
                
                <div className="meta">
                    {book.published && <span>Published <b>{book.published}</b></span>}
                    {book.yearRead && <span> &bull; Read <b>{book.yearRead}</b></span>}
                    {book.grade && <span> &bull; Rating <b>{grade}</b></span>}
                </div>

                <div className="description">
                    {book.description}
                </div>

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
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <span>&gt;</span>
      </div>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <span>&lt;</span>
      </div>
    );
  }

export default Modal
