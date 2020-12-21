const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');



const app = express();

app.use(cors());
mongoose.connect('mongodb+srv://rktest:Nt7bsuV7LfbWTHwe@cluster0.0caii.mongodb.net/rktest?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongodb');
});

app.use('/graphql',graphqlHTTP({
    schema : schema,
    graphiql : true
}));

app.listen(4000, ()=> {
    console.log('listening requests on port 4000');
});

