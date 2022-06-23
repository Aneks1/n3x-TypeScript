import { GuildMember, Message, MessageEmbed, TextChannel } from "discord.js"
import Command from '../../Strucutres/Command'
import warnThing from "../../mongoSchemas/warn-schema"
import emojis from '../../assets/emojis'

const setprefixCommand = new Command({

    name: 'unwarn',
    description: 'Takes out a warn from a member.',
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

    if(!member) { 
        message.channel.send(
            { 
                embeds: [ 
                    new MessageEmbed()
                    .setTitle(emojis.fordibben + ' Error')
                    .setDescription('I can\'t unwarn this user as they don\'t exist or they are not in the server')
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

    if(!data || data.warns == 0) { 
        message.channel.send(
            { 
                embeds: [ 
                    new MessageEmbed()
                    .setTitle(emojis.fordibben + ' Error')
                    .setDescription('This member has no warns')
                    .setColor('#ff2d2d') 
                ]
            }
        )

        return
    }
    
    else {

        data.warns --
        data.save()

        member?.roles.remove(roleIDs[data.warns])

        message.channel.send(
            { 
                embeds: [ 
                    new MessageEmbed()
                    .setTitle('🎇 Member Unwarned')
                    .setDescription(`${member} has been unwarned. (${data.warns + 1} => ${data.warns})\nReason: ${reason}`)
                    .setColor('#846bd6')
                ]
            }
        )

        channel.send(
            { 
                embeds: [ 
                    new MessageEmbed()
                    .setTitle('🎇 Member Unwarned')
                    .setDescription(`${member?.user.tag} has been unwarned (${data.warns + 1} => ${data.warns})\nReason: ${reason}\nModerator: ${message.author.tag}`)
                    .setColor('#10ed0c')
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
                    .setTitle(`🎇 You have been Unwarned`)
                    .setDescription(`You have been unwarned in ${message.guild?.name} (${data.warns + 1} => ${data.warns})\nReason: ${reason}\nModerator: ${message.author.tag}`)
                    .setColor('#10ed0c')
                    .setThumbnail(member?.user.displayAvatarURL())
                    .setFooter('ID: ' + member?.user.id)
                    .setAuthor(member?.user.tag, member?.user.displayAvatarURL()) 
                ]
            }
        )
    }
})

export default setprefixCommand