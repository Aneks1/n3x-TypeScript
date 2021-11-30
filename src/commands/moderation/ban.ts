import { GuildMember, Message, MessageEmbed, MessageReaction, TextChannel, User } from "discord.js"
import Command from "../../handlers/command-handler"
import { error, ban } from '../../assets/emojis.json'

const banCommand = new Command({
    name: 'ban',
    maxArgs: 1,
    minArgs: 1,
    expectedArgs: '<member>',
    permissions: ['BAN_MEMBERS'],
    guildCommand: true,
    run: async function (message: Message) {

        const filter = (reaction: MessageReaction, user: User) => {
            return ['✅', '❎'].includes(reaction.emoji.name!) && user.id == message.author.id
        }

        const member = message.mentions.members!.first() as GuildMember

        if(member?.permissions.has('MANAGE_MESSAGES')) {
            message.channel.send(
                {
                    embeds: [
                        new MessageEmbed()
                        .setTitle(error + ' Error')
                        .setDescription('I can\' ban a moderator / admin.')
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
                        .setTitle(error + ' Error')
                        .setDescription('I can\'t ban this user as they don\'t exist or they are not in the server')
                        .setColor('#ff2d2d')
                    ]
                }
            )

            return
        }

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

                await member.ban({ days: 7 })

                message.channel.send(
                    {
                        embeds: [
                            new MessageEmbed()
                            .setTitle(ban + ' Member Banned')
                            .setDescription(`${member} has been banned.`)
                            .setColor('#846bd6')
                        ]
                    }
                )

                auditChannel.send(
                    {
                        embeds: [
                            new MessageEmbed()
                            .setTitle(ban + ' Member Banned')
                            .setDescription(`${member} has been banned.`)
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
    }
})

export default banCommand