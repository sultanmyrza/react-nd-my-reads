import React from 'react';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';

class ListBooks extends React.Component {
    render() {
      let { onUpdateBook, updating, shelves } = this.props;  
      return(
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              { shelves.map(shelf => 
                <BookShelf 
                  key={shelf.id} 
                  title={shelf.title} 
                  books={shelf.books} 
                  onUpdateBook={onUpdateBook} 
                  updating={updating}/>
              )}
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