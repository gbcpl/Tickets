const express = require('express');
const discord = require('./app/bot')
const app = express();
const port = 8000;
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/api', require('./app/routes/api'))

const index = __dirname + '/app/views/';
app.use(express.static(index));

app.get('/', function (req,res) {
  res.sendFile(index + "index.html");
});

discord.login(process.env.DISCORD_TOKEN)

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});