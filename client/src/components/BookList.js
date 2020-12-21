import React, {Component} from 'react';

import {getBooksQuery} from './queries/query';
import BookDetails from './BookDetails';

import {graphql} from 'react-apollo';


class BookList extends Component {

    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }

    bookDisplay() {
        const data = this.props.data;
        if (data.loading) {
            return (<div> Loading the data </div>)
        }
        else {
            return data.books.map(book => {
            return (<li key={book.id} onClick={ (e) => this.setState({selected: book.id})} > {book.name} </li>)
            });
        }

    }

    render() {
        console.log(this.props);
        return (
            <div>
            <ul ids="book-list">
            {this.bookDisplay()}
            </ul>
            <BookDetails bookId={this.state.selected}>
            </BookDetails>
            </div>
        );
    }
}
export default graphql(getBooksQuery)(BookList);