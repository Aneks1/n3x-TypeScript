import path from 'path'
import fs from 'fs'
import client from '../n3x'
import { Message } from 'discord.js'
import guildThing from "../schemas/guild-schema"

export default async function loadCommands(dir: string) {

    let commandsArray: any = {}
    const files = fs.readdirSync(path.join(__dirname, dir))

    for (const file of files) {
        const commandFiles = fs.readdirSync(path.join(__dirname, dir, file))
        for(let commandFile of commandFiles) {
            commandFile = commandFile.split('.')[0]
            const command = (await(import(path.join(__dirname, dir, file, commandFile)))).default
            commandsArray[command.commandOptions.name] = command
            console.log(command.commandOptions.name)
        }
    }

    client.on('messageCreate', async (message: Message) => {
        if(message.author.bot) { return }
        const data = await guildThing.findOne({ Guild: message.guild?.id })
        let prefix = data?.Prefix
        if(!data || !prefix) prefix = 'n!'
        const args = message.content.split(/[ ]+/)
        const name = args.shift()?.toLowerCase()
        if(!name!.startsWith(prefix)) return
        const command = commandsArray[name!.replace(prefix, '')]
        if(message.content.startsWith(prefix + command.commandOptions.name)) { command.run(); return }
    })
}