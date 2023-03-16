const {Client, GatewayIntentBits} = require('discord.js')
const {createTicket} = require('./functions/ticket')
const {receivedMessage} = require('./middleware/message')
require('dotenv').config()

let discordFollowingChannels = ['1075766767219118130', '1082236405041864795']
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages
    ],
})
client.once('ready', botClient => {
  console.log('Connected')
  client.user.setPresence({
    activities:[{
        name: 'Vois des paquerettes en buvant du café'
    }],
    status: 'online'
  })
})

client.on('messageCreate', message => discordFollowingChannels.includes(message.channelId)&&message.author != client.user  ?receivedMessage(message, client)  :null)

client.on('threadCreate', thread => {
  if(thread.parentId === '1079791537862475786'){
    let newTicket = createTicket(thread)
    newTicket ?discordFollowingChannels.push(newTicket) :null
  }
})

client.login(process.env.DISCORD_TOKEN)