import React from 'react';
import '../App.css';

class BookShelf extends React.Component {
    handleBookCategoryChange = (book, category) => {
        this.props.onUpdateBook(book, category);
    }
    getCover = (book) => {
        let cover = {
            width: 128, height: 193, backgroundRepeat: 'no-repeat',
            backgroundImage: 'url("http://icons.iconarchive.com/icons/icons8/windows-8/128/City-No-Camera-icon.png")'
        }
        if (book.imageLinks) {
            cover.backgroundImage = `url("${book.imageLinks.smallThumbnail}")`
        } 
        return cover
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
                                    <div className="book-cover" style={this.getCover(book)}></div>
                                    <div className="book-shelf-changer">
                                    <select 
                                        onChange={(event) => this.handleBookCategoryChange(book, event.target.value)}
                                        defaultValue={book.shelf}>
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