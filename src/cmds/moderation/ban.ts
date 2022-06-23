import { GuildMember, Message, MessageEmbed, MessageReaction, TextChannel, User } from "discord.js"
import Command from '../../Strucutres/Command'
import emojis from '../../assets/emojis'

const banCommand = new Command({

    name: 'ban',
    description: 'Bans a member from the server.',
    category: 'mod',
    maxArgs: -1,
    minArgs: 1,
    expectedArgs: '<member> [reason]',
    permissions: ['BAN_MEMBERS'],
    guildCommand: true

},

async function (message: Message, args) {

    const filter = (reaction: MessageReaction, user: User) => {
        return ['✅', '❎'].includes(reaction.emoji.name!) && user.id == message.author.id
    }

    const member = message.mentions.members!.first() as GuildMember

    if(member?.permissions.has('MANAGE_MESSAGES')) {
        message.channel.send(
            {
                embeds: [
                    new MessageEmbed()
                    .setTitle(emojis.fordibben + ' Error')
                    .setDescription('I can\'t ban a moderator / admin.')
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
                    .setDescription('I can\'t ban this user as they don\'t exist or they are not in the server')
                    .setColor('#ff2d2d')
                ]
            }
        )

        return
    }

    let reason = args.slice(1).join(" ")
    if(!reason) reason = 'No sepecified'

    const confirmMessage = await message.channel.send(
        {
            embeds: [
                new MessageEmbed()
                .setTitle('❗ Please Confirm')
                .setDescription(`Are you sure you want to ban the member${member}? You CAN'T undo this action.`)
                .setColor('#846bd6')
            ]
        }
    )

    confirmMessage.react('✅')
    confirmMessage.react('❎')

    confirmMessage.awaitReactions({ max: 1, time: 15000, errors: ['time'], filter: filter })
    .then(async (collected: any) => {

        const reaction = collected.first()
            
        if(reaction.emoji.name == '✅') {
            const auditChannel = message.guild!.channels.cache.get('743878643352207463') as TextChannel

            await member.send(
                { 
                    embeds: [ 
                        new MessageEmbed()
                        .setTitle(`⚠ You have been Warned`)
                        .setDescription(`You have been banned in ${message.guild?.name}\nReason: ${reason}\nModerator: ${message.author.tag}`)
                        .setColor('#ff2d2d')
                        .setThumbnail(member?.user.displayAvatarURL())
                        .setFooter('ID: ' + member?.user.id)
                        .setAuthor(member?.user.tag, member?.user.displayAvatarURL()) 
                    ]
                }
            )

            await member.ban({ days: 7 })

            message.channel.send(
                {
                    embeds: [
                        new MessageEmbed()
                        .setTitle(emojis.ban + ' Member Banned')
                        .setDescription(`${member} has been banned.\nReason: ${reason}`)
                        .setColor('#846bd6')
                    ]
                }
            )

            auditChannel.send(
                {
                    embeds: [
                        new MessageEmbed()
                        .setTitle(emojis.ban + ' Member Banned')
                        .setDescription(`${member} has been banned.\nReason: ${reason}\nModerator: ${message.author.tag}`)
                        .setColor('#ff2d2d')
                        .setThumbnail(member?.user.displayAvatarURL())
                        .setFooter('ID: ' + member?.user.id)
                        .setAuthor(member?.user.tag, member?.user.displayAvatarURL())
                    ]
                }
            )

            confirmMessage.delete()
            return
        } 
        
        else if(reaction.emoji.name === '❎') {
            message.channel.send(
                {
                    embeds: [
                        new MessageEmbed()
                        .setTitle(`❎ Action Cancelled`)
                        .setDescription('You cancelled your action.')
                        .setColor('#846bd6')
                    ]
                }
            )
            confirmMessage.delete()
            return
        }
    
    })
})

export default banCommand