import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';
import * as BooksAPI from '../Services/BooksApi';

class SearchBook extends React.Component {
    state = {
        books: []
    }
    onSearch = (event) => {
        let query = event.target.value;
        console.log('search for ', query);
        BooksAPI.search(query)
                .then(response => {
                    if (response.error) {
                        this.setState({books: []})
                    } else {
                        this.setState({books: response})
                    }
                })
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
                <BookShelf books={this.state.books} />
                </div>
            </div>
        )
    }
}

export default SearchBook;