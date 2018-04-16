import React from 'react'
// import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom';
import './App.css'
import SearchBooks from './Components/SearchBooks';
import ListBooks from './Components/ListBooks';
import * as BooksApi from './Services/BooksApi';

class BooksApp extends React.Component {
  state = {
    shelves: [],
  }

  sortByShelves = (books) => {
    let shelves = [
      {
        id: "currentlyReading",
        title: "Currently Reading",
        books: books.filter(book => book.shelf === "currentlyReading")
      },
      {
        id: "wantToRead",
        title: "Want To Read",
        books: books.filter(book => book.shelf === "wantToRead")
      },
      {
        id: "read",
        title: "Read",
        books: books.filter(book => book.shelf === "read")
      },
    ];
    return shelves;
  }

  componentDidMount() {
    BooksApi.getAll().then(data => {
      this.setState({ 
        shelves:this.sortByShelves(data) 
      })
    })
  }

  updateBook = (bookToUpdate, shelf) => {
    this.setState({
      updating: true
    })
    BooksApi.update(bookToUpdate, shelf)
            .then(res => {
              // TODO: handle if res is erro
              BooksApi.getAll().then(data => {
                this.setState({ 
                  shelves: this.sortByShelves(data),
                  updating: false,
                })
              })
            });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks 
            shelves={this.state.shelves}
            onUpdateBook={this.updateBook}
            updating={this.state.updating}
          />
        )} />

        <Route path="/search" render={() => (
          <SearchBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
