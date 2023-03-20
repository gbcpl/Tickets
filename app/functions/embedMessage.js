const {EmbedBuilder} = require('discord.js')

const generateEmbedMessage = (eMessage, additionnal) => {
    const generator = new EmbedBuilder()
        .setColor(eMessage.color ?eMessage.color :'#1D0339')
        .setTitle(additionnal ?additionnal :eMessage.title)
        .setURL(eMessage.url ?eMessage.url :null)
        .setAuthor({name: eMessage.author})
        .setDescription(eMessage.title ?eMessage.title + eMessage.content :eMessage.content)
        .setTimestamp()
        .setFooter({text: 'DWWM AFPA'})
    return {embeds: [generator]}
}

module.exports = {
    generateEmbedMessage
}