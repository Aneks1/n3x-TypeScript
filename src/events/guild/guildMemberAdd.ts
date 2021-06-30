import { GuildMember, MessageAttachment, MessageEmbed, RoleResolvable, TextChannel } from 'discord.js'
import Event from '../../handlers/event-handler'
import path from 'path'
import Canvas from 'canvas'
import jimp from 'jimp'
import { wolf, party } from '../../assets/emojis.json'

const memberAddEvent = new Event({
    name: 'guildMemberAdd',
    run: async function(member: GuildMember) {
        const userEmbed = new MessageEmbed()
        .setTitle(wolf + ` Wecome to ${member.guild.name}!`)
        .setColor('#846bd6')
        .setDescription('Hi! Welcome to our server. We hope you enjoy the server.\nBefore you start talking, read <#743839307051303016> and <#804712368436281385>.\nAlse remember verify yourself in <#743854825057550458> so you can talk with other users.\nAnd remember having fun, thats the most important thing!\n  **-  Sincerely:** Staff members')

        const welcomeEmbed = new MessageEmbed()
        .setTitle(party + ' Hey Hi!')
        .setDescription(`Hi ${member}! Welcome to ${member.guild.name}!\nWe hope you enjoy the server.\n  **-  Sincerely:** Staff members`)
        .setColor('#846bd6')
        .setThumbnail(member.user.displayAvatarURL())

        const auditEmbed = new MessageEmbed()
        .setTitle(':inbox_tray: New Member')
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setDescription(`${member} has joined ${member.guild}`)
        .setColor('#00db42')
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter('ID: ' + member.user.id)

        const channel = member.guild.channels.cache.get('743849979101315193') as TextChannel
        const auditChannel = member.guild.channels.cache.get('743878643352207463') as TextChannel
        const roleId = member.guild.roles.cache.get('743833437043032103') as RoleResolvable

        if(!channel || !channel.guild) return
        channel.send(welcomeEmbed)
        
        auditChannel.send(auditEmbed)
        member.roles.add(roleId)
        await member.send(userEmbed).catch(err => console.log(err))



jimp.read(member.user.displayAvatarURL({ format: 'png' })).then(pfp => { return pfp.resize(150, 150).write(path.join(__dirname, '../../assets/user-pfp.png')) })

        setTimeout(async function() {
            const canvas = Canvas.createCanvas(700, 350)
            const ctx = canvas.getContext('2d')

            const background = await Canvas.loadImage(path.join(__dirname, '../../assets/WelcomeCanvasBackground.jpg'))
            ctx.drawImage(background, 0, 0)

            const pfp = await Canvas.loadImage(path.join(__dirname, '../../assets/user-pfp.png'))
            ctx.drawImage(pfp, canvas.width / 2- pfp.width / 2, canvas.height / 8)

            ctx.fillStyle = '#ffffff'
            ctx.font = '30px pusab'
            let text = `${member.user.username} has joined the server`
            ctx.fillText(text, canvas.width / 2 - ctx.measureText(text).width / 2, canvas.height/ 2 + canvas.height / 4)

            ctx.font = '25px pusab'
            text = `Member number ${member.guild.memberCount}`
            ctx.fillText(text, canvas.width / 2 - ctx.measureText(text).width / 2, canvas.height/ 2 + canvas.height / 3)

            const attachment = new MessageAttachment(canvas.toBuffer())
            channel.send('' ,attachment)
        }, 2000)
    }
})

export default memberAddEvent