const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//DB Config

const db = require('./config/keys').mongoURI;

//DB Connect

mongoose
    .connect(db,{useNewUrlParser : true})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));



app.get('/', (req,res)=> res.send('Hello'))

//Use Route

app.use('/api/users', users);
app.use('/app/profile',profile); 
app.use('app/posts', posts)


const port = process.env.PORT || 80;

app.listen(port,()=> console.log(`Server is running on port ${port}`));