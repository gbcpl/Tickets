const {generateRandomPassword} = require('./../functions/generate-value')
const {EmbedBuilder} = require('discord.js')

const logIn = ({author}) => {
    const {id, username, discriminator} = author
    let expireAt = new Date(Date.now()+600000)
    const user = {
        id,
        username,
        profilePicture : author.avatarURL(),
        log : {
            id : id.toString().slice(-4),
            pass : generateRandomPassword(discriminator),
        }
    }
    let embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle(`Voici vos identifiants de connexion :`)
            .setAuthor({name: author.username})
            .setDescription(`Voici vos identifiants valident 10 minutes - ${expireAt.getHours()}:${expireAt.getMinutes()} max`)
            .setFooter({text: `DWWM ~ Expiration : ${expireAt.getHours()}:${expireAt.getMinutes()}`})
            .addFields([
                {name:'ID',value: user.log.id, inline: false}, 
                {name:'Pass',value: user.log.pass, inline: false}])
    author.send({embeds:[embed]})
}

module.exports = {
    logIn
} 