
// [    Imports    ] \\

import { GuildMember, MessageAttachment, MessageEmbed, RoleResolvable, TextChannel } from 'discord.js'
import Event from '../../Strucutres/Event'
import path from 'path'
import Canvas from 'canvas'
import emojis from '../../assets/emojis'

const memberAddEvent = new Event(
    
    'guildMemberAdd',

    async function(member: GuildMember) {

        const welcomeChannel = member.guild.channels.cache.get('743849979101315193') as TextChannel
        const auditChannel = member.guild.channels.cache.get('743878643352207463') as TextChannel
        const roleId = member.guild.roles.cache.get('743833437043032103') as RoleResolvable

        if(!welcomeChannel) return

        welcomeChannel.send(
            
            { 
                embeds: [ 
                    
                    new MessageEmbed()
                    
                        .setTitle(emojis.party + ' Hey Hi!')
                        .setDescription(
                            
                            `Hi ${member}! Welcome to ${member.guild.name}!
                            We hope you enjoy the server.
                              **-  Sincerely:** Staff members`
                            
                        )
                        .setColor('#846bd6')
                        .setThumbnail(member.user.displayAvatarURL()) 
                
                ]
            }
        )
        
        auditChannel.send(
            
            { 
                embeds: [ 
                    
                    new MessageEmbed()

                        .setTitle(':inbox_tray: New Member')
                        .setAuthor(member.user.tag, member.user.displayAvatarURL())
                        .setDescription(`${member} has joined ${member.guild}`)
                        .setColor('#00db42')
                        .setThumbnail(member.user.displayAvatarURL())
                        .setFooter('ID: ' + member.user.id) 
                
                ]
            }
        )

        await member.send(
            
            { 
                embeds: [ 
                    
                    new MessageEmbed()

                        .setTitle(emojis.wolf + ` Wecome to ${member.guild.name}!`)
                        .setColor('#846bd6')
                        .setDescription(
                            
                            `Hi! Welcome to our server. We hope you enjoy the server.
                            Before you start talking, read <#743839307051303016> and <#804712368436281385>.
                            Alse remember verify yourself in <#743854825057550458> so you can talk with other users.
                            And remember having fun, thats the most important thing!
                              **-  Sincerely:** Staff members`
                            
                        ) 
    
                ]
            }

        )
        
        .catch(() => console.log(`Member ${member.user.tag} has private messages closed.`))

        member.roles.add(roleId)


        // [    Create Welcome Image    ] \\

        const bg = await Canvas.loadImage(path.join(__dirname, '../../assets/WelcomeCanvasBackground.jpg'))

        const canvas = Canvas.createCanvas(900, Math.floor(bg.height * 900 / bg.width))
        const ctx = canvas.getContext('2d')

        ctx.drawImage(bg, 0, 0)

        const pfp = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png' }))
        ctx.drawImage(pfp, canvas.width / 2 - pfp.width / 2, canvas.height / 8)

        ctx.fillStyle = '#ffffff'
        ctx.font = '30px pusab'
        let text = `${member.user.username} has joined the server`
        ctx.fillText(text, canvas.width / 2 - ctx.measureText(text).width / 2, canvas.height/ 2 + canvas.height / 4)

        ctx.font = '25px pusab'
        text = `Member number ${member.guild.memberCount}`
        ctx.fillText(text, canvas.width / 2 - ctx.measureText(text).width / 2, canvas.height/ 2 + canvas.height / 3)

        const attachment = new MessageAttachment(canvas.toBuffer())

        welcomeChannel.send({

            files: [ attachment ]
            
        })
    }
)


export default memberAddEvent