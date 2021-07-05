import { MessageEmbed } from "discord.js"
import Command from "../../handlers/command-handler"

const uiCommand = new Command({
    name: 'user-info',
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: '[user]',
    allowedChannels: ['744288105300885554'],
    run: async function (message) {
        const { guild, channel } = message

        const user = message.mentions.users.first() || message.member.user
        const member = guild.members.cache.get(user.id)
    
        const embed = new MessageEmbed()
          .setTitle(`${user.username}'s Information`)
          .setThumbnail(user.displayAvatarURL())
          .setColor('#846bd6')
          .addFields(
            {
              name: 'User Name:',
              value: user.tag,
            },
            {
              name: 'Nickname:',
              value: member.nickname || 'No nickname',
            },
            {
              name: 'Joined server:',
              value: new Date(member.joinedTimestamp).toLocaleDateString(),
            },
            {
              name: 'Joined Discord:',
              value: new Date(user.createdTimestamp).toLocaleDateString(),
            },
            {
              name: 'Roles:',
              value: member.roles.cache.size - 1,
            }
          )
        channel.send(embed)
    }
})

export default uiCommand