import client from "../n3x"
import chalk from "chalk"
import { Message, MessageEmbed } from "discord.js"
import { prefix } from '../util/config.json'
import { error } from '../assets/emojis.json'

class Command {
    private commandOptions = { commandName: [''], permissions: [''], disabled: false, guildCommand: null, permissionError: undefined, requiredRoles: [''], allowedChannels: [''], expectedArgs: '', minArgs: 0, maxArgs: null }
    private permissions = ['CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'VIEW_GUILD_INSIGHTS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS']

    private validatePermissions() {
        for (const permission of this.permissions) { if (!this.permissions.includes(permission)) { throw new Error(`No se conoce el permiso "${permission}"`) } }
        return
    }
    

    public run() {
        console.log(chalk.blueBright('> ') + 'Reading command ' + chalk.blueBright(this.commandOptions.commandName))
        client.on('message', (message: Message) => {
            if(!message.content.startsWith(prefix + this.commandOptions.commandName)) return

            this.validatePermissions()
            
            if(this.commandOptions.disabled == true) return

            if(this.commandOptions.guildCommand == true && !message.guild) { message.channel.send(new MessageEmbed().setTitle(error + ' Error').setDescription('You can only use this command in a guild.')) }
            if(this.commandOptions.guildCommand == false && message.guild) { message.channel.send(new MessageEmbed().setTitle(error + ' Error').setDescription("You can't use this command in a guild, try to DM it instead.")) }

            // Ensures that the member has the required permissions to user this command
            for (const permission of this.permissions) {
                if (!message.member.hasPermission(permission)) {
                    message.channel.send(permissionError)
                    return
                }
            }

            // Split on any number of spaces
            const args: string[] = message.content.split(/[ ]+/)
        })
    }

    public execute(...args: any[]): void {
        // So, in the command files u need to do this.execute = function() and then u write the code
    }
}

export default Command