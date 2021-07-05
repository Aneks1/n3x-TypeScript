import { Message, MessageEmbed, TextChannel } from "discord.js"
import Command from "../../handlers/command-handler"
import client from "../../n3x"

const suggestCommand = new Command({
    name: 'suggest',
    guildCommand: false,
    run: async function (message) {

        const filter = (m: Message) => m.author.id == message.author.id

        const channelId = '752672860094464091'
        const channel = client.channels.cache.get(channelId) as TextChannel

        const suggestionEmbed = new MessageEmbed()
        .setTitle('📨 New Suggestion')
        .setFooter(`Suggested by ${message.author.tag}`)
        .setThumbnail(message.author.displayAvatarURL())
        .setColor('#846bd6')

        const sendEmbed = new MessageEmbed()
        .setTitle('⏩ Suggestion')
        .setColor('#846bd6')
        .setDescription('Please send your suggestion.')

        const timeEmbed = new MessageEmbed()
        .setTitle('⏱ Time Out')
        .setColor('#ff2d2d')
        .setDescription('You ran out of time, please run the command again.')


        try {
            message.channel.send(sendEmbed)
            let msg = await message.channel.awaitMessages(filter, { max: 1, time: 120000, errors: ['time'] })
            suggestionEmbed.setDescription(msg.first().content)
        } catch {
            message.channel.send(timeEmbed)
            return
        }

        await channel?.send(suggestionEmbed).then((sentMessage: Message) => sentMessage.react('✅')).then((reaction: any) => reaction.message.react('❎'))

        const successEmbed = new MessageEmbed()
        .setTitle('✅ Suggestion Sent')
        .setDescription('Your suggestion has been submited.')
        .setColor('#846bd6')
        
        message.channel.send(successEmbed)
    }
})

export default suggestCommand