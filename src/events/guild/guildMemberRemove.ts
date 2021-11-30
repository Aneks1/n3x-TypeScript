import { GuildMember, MessageEmbed, TextChannel } from 'discord.js'
import Event from '../../handlers/event-handler'


const memberRemoveEvent = new Event({
    name: 'guildMemberAdd',
    run: async function(member: GuildMember) {



        const byeEmbed = new MessageEmbed()
            .setTitle('Bye...')
            .setDescription(`${member} has left the server. Hope you join again.`)
            .setColor('#846bd6')
            .setThumbnail(member.user.displayAvatarURL())

        const auditEmbed = new MessageEmbed()
            .setTitle(':outbox_tray: Member Left')
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setDescription(`${member} has left ${member.guild}`)
            .setColor('#ff2d2d')
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter('ID: ' + member.user.id)
            
        await(member.guild.channels.cache.get('743849979101315193') as TextChannel).send({ embeds: [byeEmbed] })
        await(member.guild.channels.cache.get('743878643352207463') as TextChannel).send({ embeds: [auditEmbed] })
    }
})

export default memberRemoveEvent