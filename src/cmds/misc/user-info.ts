import { Message, MessageEmbed, EmbedFieldData, Role } from "discord.js"
import Command from '../../Strucutres/Command'

const uiCommand = new Command({

    name: 'user-info',
    description: 'Gets information from a user.',
    category: 'misc',
    minArgs: 0,
    maxArgs: 1,
    guildCommand: true,
    expectedArgs: '[user]',
    allowedChannels: ['744288105300885554']

},

async function (message: Message) {

    const member = message.mentions.members!.first() || message.member!
    const user = member.user

    const embed = new MessageEmbed()
        .setTitle(`${user.username}'s Information`)
        .setThumbnail(user.displayAvatarURL())
        .setColor('#846bd6')
        .addFields(
            {
                name: 'User Tag:',
                value: user.tag,
            },
            {
                name: 'Nickname:',
                value: member.nickname || 'No nickname',
            },
            {
                name: 'Joined server:',
                value: new Date(member.joinedTimestamp!).toLocaleDateString(),
            },
            {
                name: 'Joined Discord:',
                value: new Date(user.createdTimestamp!).toLocaleDateString(),
            },
            {
                name: 'Roles: ',
                value: `${member.roles.cache

                            .filter((role: Role) => role.id != member.roles.cache.last()?.id)
                            .map((role: Role) => { 
                        
                                return `<@&${role.id}>` 
                    
                            })
                            .join('\n')}`,
            }

        )
    message.channel.send({ embeds: [ embed ] })
    console.log(member.roles.cache)
})

export default uiCommand