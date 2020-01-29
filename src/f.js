import React, {Component} from 'react';
import * as d3 from 'd3'
import { renderBooks } from './booksFunctions.js';
const csv = d3.csv;
//const csvData = csv('./public/books.csv').then(books => { renderBooks(books) });

const Grid = ( {books} ) => (
  <>
    {books.map(book => (<div className='booky' key={book.id}>{book.id}</div>))}
  </>
);

//
// class Grid extends Component {
//   render() {
//     return (
//       <div class="cellParent">
//         <div id="${index}" class='mainBox'>
//           <img class="img" src="/img/books/${book.id}.jpg"></img>
//           <div id='bookInfo'>
//             <p id="mainBox-title">${book.title}</p>
//             <p><i>${book.author}</i></p>
//             ${getGrade(book.grade)}
//           </div>
//         </div>
//         <div id="modal${index}" class="modal">
//           <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
//           <a class="next" onclick="plusSlides(1)">&#10095;</a>
//           <div class="modal-table">
//             <div class="modal-cell">
//               <img class="modal-content" src="/img/books/${book.id}.jpg" id="img${index}"></img>
//               <div class="caption">
//                 <p><b>Title:</b> ${book.title}</p>
//                 <p><b>Author:</b> ${book.author}</p>
//                 <p><b>Thoughts:</b> ${book.description}</p>
//                 ${getGrade(book.grade)}
//                 <p><b>Published:</b> ${book.published}
//                 <b>&nbsp; &nbsp; &nbsp; Read:</b> ${book.yearRead}</p>
//                 <p><b>Genre:</b> ${book.genre.substr(0,1).toUpperCase()}${book.genre.substr(1)}</p>
//                 ${getQuote(book.quote)}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// // Grid box component
// class GridBox extends React.Component {
//   render() {
//     return (
//       <div class='grid-box'>
//
//         <Content // Title
//           title={this.props.title}
//           content={this.props.content}
//         />
//
//         <ConversionMethod // Conversion Method
//           conversionMethod={this.props.conversionMethod}
//         />
//
//         <Example
//           example={this.props.example}
//         />
//       </div>
//     );
//   }
// }
//
// class Content extends React.Component {
//   render() {
//     return (
//       <h4>{this.props.title}: {this.props.content}</h4>
//     );
//   }
// }


export default Grid;
