const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3001;

const app = express();

/* Middleware */
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
    console.log(req.body);
    res.status(200).send({message: 'Data received on server'});
})
app.listen(PORT, ()=> {
    console.log(`listening at port ${PORT}`);
});
