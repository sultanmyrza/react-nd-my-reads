import React from 'react';
import '../App.css';

class BookShelf extends React.Component {
    handleBookCategoryChange = (book, category) => {
        this.props.onUpdateBook(book, category);
    }
    render() {
        let {title, books, updating} = this.props;
        return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                        books.map(book => (
                            <li key={book.title}>
                                <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
                                    <div className="book-shelf-changer">
                                    <select 
                                        onChange={(event) => this.handleBookCategoryChange(book, event.target.value)}
                                        selected={book.shelf}>
                                        <option value="none" selected disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors}</div>
                                { updating === true && <div>updating...</div>}
                                </div>
                            </li>
                        ))
                    }
                    </ol>
                  </div>
                </div>
        )
    }
}

export default BookShelf;