import React, {Component} from 'react';
import {graphql} from 'react-apollo';

import {getBookQuery} from './queries/query';


class BookDetails extends Component {

    displayBookDetails() {
        const {book} = this.props.data;
        if ( book) {
            return (
                <div id="book-details">
                <h4>{book.name}</h4>
                <h4>{book.author.name}</h4>
                <p> All books by this author:{book.author.name}</p>
                <ul className="other-books">
                    { book.author.books.map(item => {
                        return <li key={item.id}>{ item.name }</li>
                    })}
                </ul>
                </div>

            );
        }
        else {
            return (<div>No Book Selected</div>);
        }

    }
    render() {
        return (
            <div>
            {this.displayBookDetails()}
            </div>
        );
    }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
            id: props.bookId
            }
        }
    }
})(BookDetails);


