import React, {Component} from 'react';
import {graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash'; // compose removed from react-apollo. alternative option

import {getAuthorsQuery, addBookMutation, getBooksQuery} from './queries/query';

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
                name: "",
                authorId :""
        };
    }

    displayAuthors(){
        console.log(this.props);
        const data = this.props.getAuthorsQuery;
        if ( data.loading) {
            return (<div> Author is Loading</div>)
        }
        else {
            return (data.authors.map(author => {
                return ( <option key={author.id} value={author.id}> {author.name}</option>)
            }));
        }
    }

    submitForm(e) {
        e.preventDefault();
        //console.log(this.state);
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                authorId: this.state.authorId
            },
            refetchQueries: [{query:getBooksQuery}]
        });  // pass the query variables
    }


    render() {
        return (
            <form id="add-book" onSubmit={ this.submitForm.bind(this) } >
                <p> Add Book:</p>
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={ (e) => this.setState({ authorId: e.target.value }) } >
                        <option>Select author</option>
                        { this.displayAuthors() }
                    </select>
                </div>
                <button>+</button>
            </form>
        );

    }
}

// compose - combining multiple queries inbto react component

//export default graphql(getAuthorsQuery)(AddBook);

export default compose(
    graphql(getAuthorsQuery, { name : "getAuthorsQuery"}),
    graphql(addBookMutation, { name : "addBookMutation"})
    )(AddBook);