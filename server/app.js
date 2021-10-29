const express =  require('express');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT | 3000;

const app = express();
const users = require('./routes/users');

/* CORS Middleware */
app.use(cors());

/* Body Parser Middleware */
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', users);

/* Index route */
app.get('/', (req,res) => {
    res.send('Invalid endpoint');
})

app.listen(PORT, ()=> {
    console.log(`listening at port ${PORT}`);
});

/*
ez82V17iB82mmaKt*/
