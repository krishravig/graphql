
import { gql } from 'apollo-boost';

const getBooksQuery = gql`
{
    books {
        name
        id
    }
}
`;

const getAuthorsQuery = gql`
{
    authors {
        id
        name
    }
}

`;

// query variables
const addBookMutation = gql`
mutation($name: String!, $authorId:ID!) {   
    addBook(name:$name, authorId: $authorId) {
    name,
    id
    }

}
`;

const getBookQuery = gql`
query($id:ID!){
    book(id:$id){
        name
        id
        author{
            name
            id
            books{
                name
                id
            }
        }
    }
}
`;


export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookQuery };
