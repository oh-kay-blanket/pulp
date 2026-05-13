import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";
import { getQuote, getRating } from './AppFunctions.js';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Modal = ({ data, modalId, slider, handleTileClick }) => {

    const sliderSettings = {
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

    // Fix: Trigger slickGoTo when the modal opens and slider is ready
    useEffect(() => {
        if (modalId !== "" && slider.current) {
            const index = data.findIndex(book => book.id === modalId);
            if (index !== -1) {
                slider.current.slickGoTo(index, true);
            }
        }
    }, [modalId, data]);

    const modalList = modalId !== "" && data.map((book) => (<ModalCell key={book.id} book={book} />));

    return (
        <div 
            className={modalId === "" ? 'modal hidden': 'modal'}
            onClick={() => handleTileClick(0, "")}
        >
            <div 
                id="modal-table" 
                className="modal-table"
                onClick={(e) => e.stopPropagation()}
            >
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

    const rating = <div className="modal-rating">{getRating(book.grade)}</div>;

    const placeholderCover = (
        <div className="book-placeholder paper-stack">
            <div className="placeholder-title">{book.title}</div>
            <div className="placeholder-author">{book.author}</div>
        </div>
    );

    return(
        <div className="modal-cell">
            <div className="modal-cell-content">
                {book.image ? 
                    <img className="paper-stack" loading="lazy" alt='' src={book.image}></img> :
                    placeholderCover
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
                    </div>

                    {book.grade && <div className="modal-rating-line">{rating}</div>}

                    <div className="description">
                        {book.description}
                    </div>

                    {getQuote(book.quote)}
                </div>
            </div>
        </div>
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style }}
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
        style={{ ...style }}
        onClick={onClick}
      >
        <span>&lt;</span>
      </div>
    );
  }

export default Modal
