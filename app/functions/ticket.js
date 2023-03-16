const {EmbedBuilder} = require('discord.js')

const createTicket = thread => {
    const {id, name, _createdTimestamp: createdAt,ownerId, appliedTags: tags, messages } = thread
    thread.guild.members.fetch(ownerId)
    .then(authorMember => {
        const {content, url} = messages.cache.first()
        const ticket = {
            title: name,
            discordId: id,
            discordMessage : url,
            content,
            author: ownerId,
            authorName : authorMember.user.username,
            tags,
            createdAt
        }
        const embed = new EmbedBuilder()
            .setColor(ticket.color ?ticket.color :'#F00020')
            .setTitle(`Création de ticket valide : ${name}`)
            .setURL(url)
            .setAuthor({name: authorMember.user.username})
            .setDescription(content)
            .setTimestamp(createdAt)
            .setFooter({text: 'DWWM'})
        authorMember.send({embeds:[embed]})
        .then(message => {
            console.table(ticket)
            return ticket.discordId
        })
    })
}
module.exports = {createTicket}