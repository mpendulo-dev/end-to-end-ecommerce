const express =  require('express');
const path = require('path');
const passport = require('passport');
const cors = require('cors');
const PORT = process.env.PORT | 3000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const users = require('./routes/users');

/* connect to database */
mongoose.connect('mongodb://localhost:27017/tsenga', {useNewUrlParser: true}, {useUnifiedTopology: true});
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', ()=> {
    console.log('connected to database');
});
mongoose.connection.on('error', (err)=>{
    console.log(`database error ${err}`);
});

/* CORS Middleware */
app.use(cors());

/* Body Parser Middleware */
app.use(express.json());


app.use('/users', users);

/* Index route */
app.get('/', (req,res) => {
    res.send('Invalid endpoint');
})


/* Browser cookies */
app.listen(PORT, ()=> {
    console.log(`listening at port ${PORT}`);
});

