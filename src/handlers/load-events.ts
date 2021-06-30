import fs from 'fs'

export default async function loadEvents(dirs: string) {

    const eventFiles = fs.readdirSync(`./src/events/${dirs}`).filter(file => file.endsWith('.ts'))

    for(const file of eventFiles) {
        const event = (await(import(`../events/${dirs}/${file}`))).default
        event.run()
    }
}