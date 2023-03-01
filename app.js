const express = require('express'); //Import the express dependency
const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening
const hostname = '127.0.0.1';

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.get('/categories', (req, res) => {       
    res.sendFile('categories.html', {root: __dirname});      
                                                       
});

app.get('/closedtickets', (req, res) => {       
    res.sendFile('closedtickets.html', {root: __dirname});      
                                                       
});

app.get('/tickets', (req, res) => {       
    res.sendFile('tickets.html', {root: __dirname});      
                                                       
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on http://${hostname}:${port}/`);
});
