const {generateRandomPassword} = require('./../functions/generate-value')
const {EmbedBuilder} = require('discord.js')
const sequelize = require('../config/database-config')

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
    .then(async me => {
        try 
        {        
            const sqlQuery = 'INSERT INTO login (idDiscord, username, profilePicture, logID, passID, expiration) VALUES (:id, :username, :profilePicture, :logid, :logpass, :expire )'
            const result = await sequelize.query(sqlQuery, {
            replacements: {
                id : user.id, 
                username : user.username, 
                profilePicture: user.profilePicture, 
                logid : user.log.id, 
                logpass : user.log.pass, 
                expire : expireAt.getTime()
            },
            type: QueryTypes.INSERT
        })
            console.log('Query OK to log '+user.username)
            console.log(result)
            } catch (error) {
                console.error(error.message);
            }
        })
}

module.exports = {
    logIn
} 
