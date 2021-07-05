import { MessageEmbed } from "discord.js"
import Command from "../../handlers/command-handler"

const avatarCommand = new Command({
    name: 'avatar',
    maxArgs: 1,
    minArgs: 0,
    expectedArgs: '[user]',
    allowedChannels: ['744288105300885554'],
    run: async function (message) {
        const user = message.mentions.users.first() || message.author

        const avatarEmbed = new MessageEmbed()
            .setTitle(`${user.username}'s Avatar`)
            .setColor('#846bd6')
            .setImage(user.displayAvatarURL({ dynamic: true }))
        message.channel.send(avatarEmbed)
    }
})

export default avatarCommand