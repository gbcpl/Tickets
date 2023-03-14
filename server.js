const express = require('express');
const app = express();              
const port = 8000;                  
const hostname = '127.0.0.1';
const cors = require('cors')


// const path = require('path');

app.use(cors())
app.use(express.json())

const ticketRouter = require('./app/routes/routes');
app.use('/tickets', ticketRouter);

const index = __dirname + '/app/views/';
app.use(express.static(index));

app.get('/', function (req,res) {
  res.sendFile(index + "index.html");
});


app.listen(port, () => {
    console.log(`Now listening on http://${hostname}:${port}/`);
});