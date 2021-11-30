import fs from 'fs'
import path from 'path'

export default async function loadEvents(dir: string) {

    const files = fs.readdirSync(path.join(__dirname, dir))

    for (const file of files) {
        const eventTypes = fs.readdirSync(path.join(__dirname, dir, file))
        for(let eventFile of eventTypes) {
            eventFile = eventFile.split('.')[0]

            const event = (await(import(path.join(__dirname, dir, file, eventFile)))).default
            event.run()
        }
    }
}