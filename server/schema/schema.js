const graphql = require('graphql');
const _ = require('lodash');

// load the models
const Book = require('../models/book');
const Author = require('../models/author');


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
    } = graphql;

// dummy data
//
// const books = [
//     {name : 'Objective C Book', id: '1', authorId :'1'},
//     {name : 'Java Book', id: '2', authorId :'2'},
//     {name : 'Spring Book', id: '3', authorId :'3'},
//     {name : 'Software Design Book', id: '1', authorId :'1'},
//     {name : 'Effective Java', id: '2', authorId :'2'},
//     {name : 'Spring Boot', id: '3', authorId :'3'}
// ];
//
// const authors = [
//     {name : 'Tom', age : 35, id: '1'},
//     {name : 'Thompson', age : 45, id: '2'},
//     {name : 'Paul', age : 54, id: '3'}
// ];

// Define types (Book)
// Define Relationships
// Define Root queries

const BookType = new GraphQLObjectType({
    name:'Book',
    fields: () => ({
        id:{type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        author: {
            type: AuthorType,
            resolve(parent, args){
                //return _.find(authors, {id: parent.authorId});
                return Author.findById(parent.authorId);
            }
        }
    })

});

const AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields : ()=> ({
        id: {type: GraphQLID},
        name : {type: new GraphQLNonNull(GraphQLString)},
        age : {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return _.filter(books, {authorId: parent.id});
                return Book.find({authorId: parent.id});
            }
        }

    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book : {
            type: BookType,
            args: {id : {type: GraphQLID}},
            resolve(parent, args) {
                //return _.find(books, {id: args.id});
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: {id : {type: GraphQLID}},
            resolve(parent, args) {
                //return _.find(authors, {id: args.id});
                return Author.findById(args.id);
            }
        },
        books : {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return books;
                return Book.find({});
            }
        },
        authors: {
            type : new GraphQLList(AuthorType),
            resolve(parent, args) {
                //return authors;
                return Author.find({});

            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type : new GraphQLNonNull(GraphQLString)},
                age : {type: GraphQLInt}
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

