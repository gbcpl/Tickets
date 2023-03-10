const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 8000;                  //Save the port number where your server will be listening
const hostname = '127.0.0.1';

// const path = require('path');
const ticketRouter = require('./app/routes/routes');
app.use('/tickets', ticketRouter);

const index = __dirname + '/app/views/';
app.use(express.static(index));

app.get('/', function (req,res) {
  res.sendFile(index + "index.html");
});


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on http://${hostname}:${port}/`);
});