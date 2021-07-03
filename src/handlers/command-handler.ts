import client from "../n3x"
import chalk from "chalk"
import { Message, MessageEmbed, PermissionResolvable } from "discord.js"
import { error } from '../assets/emojis.json'
import guildThing from "../schemas/guild-schema"

class Command {
    private commandOptions = { name: '', permissions: [''], disabled: false, guildCommand: true, requiredRoles: [''], allowedChannels: [''], expectedArgs: '', minArgs: 0, maxArgs: 0 }

    private validatePermissions() {
        const validPermissions = ['CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'VIEW_GUILD_INSIGHTS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS'] as PermissionResolvable[]
        for (const permission of this.commandOptions.permissions) { if(permission != '') { if (!validPermissions.includes(permission as PermissionResolvable)) { throw new Error(`Unknown permission "${permission}"`) }}}
        return
    }

    private validateRoles(message: Message) {
        for(const role of this.commandOptions.requiredRoles) {
            if(role != '') { if(!message.guild?.roles.cache.get(role)) { throw new Error(`Unknown role id ${role}. (Please consider using the role id and check that it's a valid id)`) }}
        }
    }

    private validateChannels(message: Message) {
        for(const channel of this.commandOptions.allowedChannels) {
            if(channel != '') { if(!message.guild?.channels.cache.get(channel)) { throw new Error(`Unknown guild channel id ${channel}. (Please consider using the channel id and check that it's a valid id)`) }}
        }
    }
    

    public run() {

        console.log(chalk.magentaBright('> ') + 'Reading command ' + chalk.magentaBright(this.commandOptions.name))
        client.on('message', async (message: Message) => {

            // Split on any number of spaces
            const args = message.content.split(/[ ]+/)
            const name = args.shift()?.toLowerCase()
            const data = await guildThing.findOne({ Guild: message.guild?.id })
            let prefix = data?.Prefix

            if(!data || !prefix) prefix = 'n!'

            if(name != prefix + this.commandOptions.name) return

            this.validatePermissions()
            this.validateRoles(message)
            this.validateChannels(message)
            
            if(this.commandOptions.disabled == true) return

            if(this.commandOptions.guildCommand == true && !message.guild) { message.channel.send(new MessageEmbed().setTitle(error + ' Error').setDescription('You can only use this command in a guild.').setColor('#ff2d2d')); return }
            if(this.commandOptions.guildCommand == false && message.guild) { message.channel.send(new MessageEmbed().setTitle(error + ' Error').setDescription("You can't use this command in a guild, try to DM it instead.").setColor('#ff2d2d')); return }

            // Ensures that the member has the required permissions to user this command
            for (const permission of this.commandOptions.permissions) {
                if(this.commandOptions.permissions[0] != '') {
                    if (!message.member?.hasPermission(permission as PermissionResolvable)) { message.channel.send(new MessageEmbed().setTitle(error + ' Error').setDescription("You don't have enough permissions to use this command.").setColor('#ff2d2d')); return }
                }
            }

            for (const requiredRole of this.commandOptions.requiredRoles) {
                if(this.commandOptions.requiredRoles[0] != '') {
                    if (!message.member?.roles.cache.get(requiredRole)) { message.channel.send(new MessageEmbed().setTitle(error + ' Error').setDescription("You don't have the required roles to use this command.").setColor('#ff2d2d')); return }
                }
            }

            for(const allowedChannel of this.commandOptions.allowedChannels) {
                if(this.commandOptions.allowedChannels[0] != ''){
                    if(this.commandOptions.allowedChannels && message.channel.id != allowedChannel) { message.channel.send(new MessageEmbed().setTitle(error + ' Error').setDescription(`This is not an allowed channel to use this command, please go to <#${allowedChannel}>`).setColor('#ff2d2d')); return }    
                }
            }

            if(args.length > this.commandOptions.maxArgs || args.length < this.commandOptions.minArgs) { message.channel.send(new MessageEmbed().setTitle(error + ' Error').setDescription(`Syntax error, please use ${name} ${this.commandOptions.expectedArgs}`).setColor('#ff2d2d')); return }

            this.execute(message, args, client)
        })
    }

    private execute(...args: any[]): void {
        // This changes in command files.
    }

    constructor({ name = '', permissions = [''], disabled = false, guildCommand = true, requiredRoles = [''], allowedChannels = [''], expectedArgs = '', minArgs = 0, maxArgs = 0, run = async function(...args:any[]) {} }) {
        this.commandOptions.name = name
        this.commandOptions.permissions = permissions
        this.commandOptions.disabled = disabled
        this.commandOptions.guildCommand = guildCommand
        this.commandOptions.requiredRoles = requiredRoles
        this.commandOptions.allowedChannels = allowedChannels
        this.commandOptions.expectedArgs = expectedArgs
        this.commandOptions.minArgs = minArgs
        this.commandOptions.maxArgs = maxArgs
        this.execute = run
    }
}

export default Command