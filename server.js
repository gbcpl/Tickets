const express = require('express');
require('./app/middleware/bot')
const app = express();
const port = 8000; 
const hostname = '127.0.0.1';
const cors = require('cors')



app.use(cors())

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