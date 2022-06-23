import { MessageEmbed, Message } from "discord.js"
import Command from '../../Strucutres/Command'

const pingCommand = new Command({

    name: 'ping',
    description: 'Gets the bot\'s delay in milliseconds.',
    category: 'misc',
    minArgs: 0,
    maxArgs: 0

},

async function (message: Message) {

    const pingEmbed = new MessageEmbed()

        .setTitle('🏓 Pong!')
        .setColor('#846bd6')

    const msg = await message.channel.send({ embeds: [pingEmbed] })
    const ping = msg.createdTimestamp - message.createdTimestamp
    const pingEmbed2 = new MessageEmbed()

        .setTitle('🏓 Pong!')
        .setDescription(`My ping is ${ping}ms.`)
        .setColor('#846bd6')

    msg.edit({ embeds: [pingEmbed2] })

})

export default pingCommand