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

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books}/>
        )} />

        <Route path="/search" render={() => (
          <SearchBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
