const {createTicket} = require('../functions/ticket')
const {logIn} = require('./logInWebSite')
let her='efefe'
const receivedMessage = (message, client) => {
    const {content} = message
    if(content === '/logIn'){
        logIn(message)
    }
    if(content.startsWith('-')){
        if (content.length === 1){
            message.reply(`La liste des commandes est :
-valid : permet de valider la réponse à un ticket.`)
        }
        if(message.author.id === '740941732237279303' && content === '-listChannel'){
            let array = []
            let messageThread = ''
            let messageNoThread = ''
            client.channels.cache.forEach(element => {
                array.push({
                    nom : element.name,
                    threadChannel : element.isThread(),
                    parent : element.isThread() ?element.parent.name :null
                })
                if(element.isThread()){
                    messageThread += `📁 ***${element.isThread() ?element.parent.name :null}*** **=> 💬 ${element.name}**
`
                }
                else {
                    messageNoThread += `💬 ${element.name}
`
                }
            })
            const messageToSend = `**__💬Channel principal__** :
${messageNoThread}
-------------------------------------
**__📁Channel thread__** :
${messageThread}`
            if(messageToSend.length >= 2000 && messageToSend.length < 4000){
                message.author.send(`**__Channel principal__** :
${messageNoThread}`
                )
                .then(msg => {
                    message.author.send(`**__Channel thread** :
${messageThread}`
                    )
                })
            }
            else if (messageToSend.length < 2000) {
                message.author.send(messageToSend)
            }
            else {
                message.author.send('Ask for Channel list : Impossible to send Data for the moment, the length is : '+messageToSend.length)
            }
        }
    }
}

module.exports = {
    receivedMessage
}