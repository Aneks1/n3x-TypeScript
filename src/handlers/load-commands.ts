import path from 'path'
import fs from 'fs'

export default async function loadCommands(dir: string) {

    const files = fs.readdirSync(path.join(__dirname, dir))

    for (const file of files) {
        const commandFiles = fs.readdirSync(path.join(__dirname, dir, file))
        for(let commandFile of commandFiles) {
            commandFile = commandFile.split('.')[0]
            const command = (await(import(path.join(__dirname, dir, file, commandFile)))).default
            await command.run()
        }
    }
}