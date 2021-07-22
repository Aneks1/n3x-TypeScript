import fs from 'fs'

export default async function loadEvents(dirs: string) {

    const eventFiles = fs.readdirSync(`./dist/events/${dirs}`)

    for(const file of eventFiles) {
        const event = (await(import(`../events/${dirs}/${file}`))).default
        event.run()
    }
}