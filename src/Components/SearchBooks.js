import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';
import * as BooksAPI from '../Services/BooksApi';

class SearchBook extends React.Component {
    state = {
        syncedBooks: []
    }
    syncBooks = (booksInShelves, searchedBooks) => {
        let syncedBooks = searchedBooks.map(searchedBook => {
            let bookInShelf = booksInShelves.find(bookInShelf => bookInShelf.title === searchedBook.title);
            if ( bookInShelf ){
                return bookInShelf;
            } else {
                searchedBook.shelf="none";
                return searchedBook;
            }
        });
        return syncedBooks;
    }
    onSearch = (event) => {
        let query = event.target.value;
        this.setState({ books: [] })
        if(query.length === 0) {
            this.setState({
                syncedBooks: []
            })
        } else {
            BooksAPI.search(query)
            .then(searchedBooks => {
                let syncedBooks = this.syncBooks(this.props.booksInShelves, searchedBooks);
                this.setState({ syncedBooks: syncedBooks})
            }).catch(response => {
                console.log(response);
            })
        }
    }

    render() {
        return(
            <div className="search-books">
                <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                    <input 
                        onChange={this.onSearch}
                        type="text" placeholder="Search by title or author"/>

                </div>
                </div>
                <div className="search-books-results">
                <BookShelf books={this.state.syncedBooks} onUpdateBook={this.props.onUpdateBook}/>
                </div>
            </div>
        )
    }
}

export default SearchBook;