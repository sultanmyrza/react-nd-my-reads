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
        console.log('booksInShelves', booksInShelves);
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
        console.log(query, query.length);
        if(query.length === 0) {
            this.setState({
                syncedBooks: []
            })
        } else {
            BooksAPI.search(query)
            .then(searchedBooks => {
                console.log('searchedBooks', searchedBooks)
                let syncedBooks = this.syncBooks(this.props.booksInShelves, searchedBooks);
                console.log('synced books', syncedBooks);
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
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
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