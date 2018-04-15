import React from 'react';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';

class ListBooks extends React.Component {
    render() {
      let { books } = this.props;
      let currentlyReading = books.filter(book => book.shelf === "currentlyReading");
      let wantToRead = books.filter(book => book.shelf === "wantToRead");
      let read = books.filter(book => book.shelf === "read");
       
      return(
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf key="1" title="Currently Reading" books={currentlyReading} />
              <BookShelf key="2" title="Want To Read" books={wantToRead} />
              <BookShelf key="3" title="Read" books={read} />
            </div>
          </div>
          <div className="open-search">
              <Link to="/search">Add a book</Link>
          </div>
        </div>
      )
    }
}

export default ListBooks;