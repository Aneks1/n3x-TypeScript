import { MessageEmbed } from "discord.js"
import Command from "../../handlers/command-handler"

const pingCommand = new Command({
    name: 'ping',
    run: async function (message) {
        const pingEmbed = new MessageEmbed()
        .setTitle('🏓 Pong!')
        .setColor('#846bd6')

        message.channel.send(pingEmbed).then((msg: any) => {
            const ping = msg.createdTimestamp - message.createdTimestamp
            const pingEmbed2 = new MessageEmbed()
            .setTitle('🏓 Pong!')
            .setDescription(`My ping is ${ping}ms.`)
            .setColor('#846bd6')
            msg.edit(pingEmbed2)
      })
    }
})

export default pingCommand