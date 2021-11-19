const express =  require('express');
const path = require('path');
const passport = require('passport');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require("cookie-parser");

const app = express();
const users = require('./routes/users');

/* connect to database */
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}, {useUnifiedTopology: true});
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

/* Cookie parser middleware */
app.use(cookieParser());


app.use('/api/users', users);

/* Index route */
app.get('/', (req,res) => {
    res.send('Invalid endpoint');
})

app.listen(PORT, ()=> {
    console.log(`listening at port ${PORT}`);
});

