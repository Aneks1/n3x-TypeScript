import { Message, MessageEmbed } from "discord.js"
import Command from '../../Strucutres/Command'


const avatarCommand = new Command({
    name: 'avatar',
    description: 'Shows a user\'s profile picture.',
    category: 'misc',
    maxArgs: 1,
    minArgs: 0,
    expectedArgs: '[user]',
    allowedChannels: ['744288105300885554']
},

async function (message: Message) {

    const user = message.mentions.users.first() || message.author

    message.channel.send({

        embeds: [

            new MessageEmbed()
            .setTitle(`${user.username}'s Avatar`)
            .setColor('#846bd6')
            .setImage(user.displayAvatarURL({ dynamic: true }))

        ]
    })
})

export default avatarCommand