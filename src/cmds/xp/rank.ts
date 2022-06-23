import { Message, MessageEmbed } from "discord.js"
import Command from "../../Strucutres/Command"
import levelThing from "../../mongoSchemas/level-schema"
import emojis from '../../assets/emojis'

const rankCommand = new Command({
    name: 'rank',
    description: 'Shows your rank in the server.',
    category: 'xp',
    maxArgs: 1,
    minArgs: 0,
    expectedArgs: '[user]',
    allowedChannels: ['744288105300885554'],
    guildCommand: true
},

async function (message: Message) {

    const user = message.mentions.users.first() || message.member
    let data = await levelThing.findOne({ Guild: message.guild!.id, User: user!.id })
    
    if(!data) { 
        
        message.reply({

            embeds: [

                new MessageEmbed()
                .setTitle(emojis.fordibben + `Error`)
                .setDescription('You are not ranked yet, send some messages first.')
                .setColor('#ff2d2d')

            ]
        })

        return
    }

    message.reply({

        embeds: [

            new MessageEmbed()
            .setTitle(`🏆 ${message.author.username}'s Rank`)
            .addField('**Level: **', data.level + '')
            .addField('**XP: **', data.xp + '/' + data.toLevelUp)
            .setColor('#846bd6')
        ] 
    })
})

export default rankCommand