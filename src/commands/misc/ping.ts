import { MessageEmbed, Message } from "discord.js"
import Command from "../../handlers/command-handler"

const pingCommand = new Command({
    name: 'ping',
    run: async function (message: Message) {
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
    }
})

export default pingCommand