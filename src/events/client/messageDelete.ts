import { Message, MessageEmbed, TextChannel } from 'discord.js'
import Event from '../../Strucutres/Event'

const messageEvent = new Event(
    'messageDelete',
    async function(message: Message) {
        const auditChannel = message.guild!.channels.cache.get('743878643352207463') as TextChannel

        if(message.author.bot) return

        auditChannel.send(
            {
                embeds: [
                    new MessageEmbed()
                    .setTitle('🗑 Message Deleted')
                    .setDescription(`A message from ${message!.author.tag} has been deleted.\nMessage: ${message.content}`)
                    .setColor('#ff2d2d')
                    .setThumbnail(message.member!.user.displayAvatarURL())
                    .setFooter('ID: ' + message.member!.user.id)
                    .setAuthor(message!.author.tag, message!.author.displayAvatarURL())
                ]
            }
        )
    }
)

export default messageEvent