import React from 'react'
// import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom';
import './App.css'
import SearchBooks from './Components/SearchBooks';
import ListBooks from './Components/ListBooks';
import * as BooksApi from './Services/BooksApi';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksApi.getAll().then(data => {
      this.setState({ books: data })
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
                  books: data,
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
            books={this.state.books}
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
