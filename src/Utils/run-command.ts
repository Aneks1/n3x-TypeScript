
// [    Imports    ] \\

import { Message, MessageEmbed, PermissionResolvable } from "discord.js"
import emojis from "../assets/emojis"
import Command from '../Strucutres/Command'

function runCommand(message: Message, cmd: Command) {

    const args = message.content.split(' ')
    args.shift()

    cmd.checkParams(message)
    
    if(cmd.params.disabled) return false

    if(cmd.params.guildCommand && !message.guild || cmd.params.guildCommand == false && message.guild) { 

        message.reply(
            { 
                embeds: [
                    new MessageEmbed()
                    .setTitle(emojis.fordibben + ' Error')
                    .setDescription('You can only use this command in a ' + message.guild ? 'guild.' : 'DM channel. Try to DM it instead.')
                    .setColor('#ff2d2d')
                ]
            } 
        )

        return false
    }

    

    // Ensures that the member has the required permissions to user this command
    for (const permission of cmd.params.permissions!) {

        if(cmd.params.permissions![0] != '') {

            if (!message.member?.permissions.has(permission as PermissionResolvable)) {
                message.reply(
                    {
                        embeds: [
                            new MessageEmbed()
                            .setTitle(emojis.fordibben + ' Error')
                            .setDescription("You don't have enough permissions to use this command.")
                            .setColor('#ff2d2d')
                        ]
                    }
                )

                return false
            }

        }

    }

    for (const requiredRole of cmd.params.requiredRoles!) {

        if(cmd.params.requiredRoles![0] != '') {

            if (!message.member?.roles.cache.get(requiredRole)) { 
                
                message.reply(
                    { 
                        embeds: [
                            new MessageEmbed()
                            .setTitle(emojis.fordibben + ' Error')
                            .setDescription("You don't have the required roles to use this command.")
                            .setColor('#ff2d2d')
                        ]
                    }
                )

                return false
            }
        }
    }

    for(const channel of cmd.params.allowedChannels!) {

        if(cmd.params.allowedChannels![0] != '') {

            if(message.channel.id != channel) { 

                message.reply(
                    {
                        embeds: [
                            new MessageEmbed()
                            .setTitle(emojis.fordibben + ' Error')
                            .setDescription(`You can't use this command on this channel, please go to <#${channel}>`)
                            .setColor('#ff2d2d')
                        ]
                    }
                )
                
                return false
            }    

        }


    }

    if(cmd.params.maxArgs! >= 0) { 
        
        if(args.length > cmd.params.maxArgs || args.length < cmd.params.minArgs) { 
            
            message.reply(
                {
                    embeds: [
                        new MessageEmbed()
                        .setTitle(emojis.fordibben + ' Error')
                        .setDescription('Syntax error, please use `' + cmd.params.name + ' ' + cmd.params.expectedArgs + '` instead.')
                        .setColor('#ff2d2d')
                    ]
                }
            )
            
            return false
        }
    }

    cmd.run(message, args)
    return true

}

export default runCommand