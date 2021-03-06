import { GuildMember, Message, MessageEmbed, TextChannel } from "discord.js"
import Command from '../../Strucutres/Command'
import warnThing from "../../mongoSchemas/warn-schema"
import emojis from '../../assets/emojis'

const setprefixCommand = new Command({
    name: 'warn',
    description: 'Adds a warn to a member.',
    category: 'mod',
    minArgs: 1,
    maxArgs: -1,
    expectedArgs: '<member> [reason]',
    guildCommand: true,
    permissions: ['MANAGE_MESSAGES']

},

async function (message: Message, args) {

    const roleIDs = [
        '810249115644592129',
        '810249207490412544', 
        '810249235366674512', 
        '810249273177276417', 
        '810249288692400178', 
        '810249304459182141'
    ]
    
    const member = message.mentions.members?.first() as GuildMember
    
    if(member?.permissions.has('MANAGE_MESSAGES')) {
        message.channel.send(
            { 
                embeds: [ 
                    new MessageEmbed()
                    .setTitle(emojis.fordibben + ' Error')
                    .setDescription('I can\'t warn a moderator / admin.')
                    .setColor('#ff2d2d')
                ]
            }
        )
        return 
    
    }
    if(!member) { 
        message.channel.send(
            { 
                embeds: [ 
                    new MessageEmbed()
                    .setTitle(emojis.fordibben + ' Error')
                    .setDescription('I can\'t warn this user as they don\'t exist or they are not in the server')
                    .setColor('#ff2d2d') 
                ]
            }
        )
        return
    }

    const channel = message.guild?.channels.cache.get('743878643352207463') as TextChannel

    let reason = args.slice(1).join(" ")
    if(!reason) reason = 'No sepecified'

    let data = await warnThing.findOne(
        { 
            Guild: message.guild?.id,
            User: member?.id 
        }
    )

    if(!data) { 
        data = new warnThing(
            { 
                Guild: message.guild?.id, 
                User: member?.id, 
                warns: 1 
            }
        )
        data.save()

        message.channel.send(
            { 
                embeds: [ 
                    new MessageEmbed()
                    .setTitle('??? Member Warned')
                    .setDescription(`${member} has been warned. (0 => 1)\nReason: ${reason}`)
                    .setColor('#846bd6') 
                ]
            }
        )
        
        member?.roles.add(roleIDs[0])
        channel.send(
            { 
                embeds: [ 
                    new MessageEmbed()
                    .setTitle('??? Member Warned')
                    .setDescription(`${member?.user.tag} has been warned (0 => 1)\nReason: ${reason}\nModerator: ${message.author.tag}`)
                    .setColor('#ff2d2d')
                    .setThumbnail(member?.user.displayAvatarURL())
                    .setFooter('ID: ' + member?.user.id)
                    .setAuthor(member?.user.tag, member?.user.displayAvatarURL())
                ]
            }
        )

        await member.send(
            { 
                embeds: [ 
                    new MessageEmbed()
                    .setTitle(`??? You have been Warned`)
                    .setDescription(`You have been warned in ${message.guild?.name} (0 => 1)\nReason: ${reason}\nModerator: ${message.author.tag}`)
                    .setColor('#ff2d2d')
                    .setThumbnail(member?.user.displayAvatarURL())
                    .setFooter('ID: ' + member?.user.id)
                    .setAuthor(member?.user.tag, member?.user.displayAvatarURL())
                ]
            }
        )

        return
    }
    
    else {

        data.warns = data.warns + 1
        data.save()

        member?.roles.add(roleIDs[data.warns - 1])

        message.channel.send(
            { 
                embeds: [ 
                    new MessageEmbed()
                    .setTitle('??? Member Warned')
                    .setDescription(`${member} has been warned. (${data.warns - 1} => ${data.warns})\nReason: ${reason}`)
                    .setColor('#846bd6')
                ]
            }
        )

        channel.send(
            { 
                embeds: [ 
                    new MessageEmbed()
                    .setTitle('??? Member Warned')
                    .setDescription(`${member?.user.tag} has been warned (${data.warns - 1} => ${data.warns})'\nReason: ${reason}\nModerator: ${message.author.tag}`)
                    .setColor('#ff2d2d')
                    .setThumbnail(member?.user.displayAvatarURL())
                    .setFooter('ID: ' + member?.user.id)
                    .setAuthor(member?.user.tag, member?.user.displayAvatarURL())
                ]
            }
        )
    
        await member.send(
            { 
                embeds: [ 
                    new MessageEmbed()
                    .setTitle(`??? You have been Warned`)
                    .setDescription(`You have been warned in ${message.guild?.name} (${data.warns - 1} => ${data.warns})\nReason: ${reason}\nModerator: ${message.author.tag}`)
                    .setColor('#ff2d2d')
                    .setThumbnail(member?.user.displayAvatarURL())
                    .setFooter('ID: ' + member?.user.id)
                    .setAuthor(member?.user.tag, member?.user.displayAvatarURL()) 
                ]
            }
        )
    }
})

export default setprefixCommand