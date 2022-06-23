
// [    Imports    ] \\

import { Client } from 'discord.js'
import path from 'path'
import fs from 'fs'
import mongoose from 'mongoose'
import chalk from 'chalk'

import config from './config'
import Command from '../Strucutres/Command'


class n3x extends Client {

    public commands: Command[] = []

    public connectToMongo(mongoPath: string) {

        mongoose.connect(mongoPath)
    }

    public async loadEvents(dir: string) {

        const files = fs.readdirSync(path.join(__dirname, dir))

        for (const file of files) {

            const folders = fs.readdirSync(path.join(__dirname, dir, file))

            for(let eventFile of folders) {

                eventFile = eventFile.split('.')[0]
    
                const event = (await(import(path.join(__dirname, dir, file, eventFile)))).default

                client.on(event.name, (...args: any[]) => {

                    event.run(...args)
                    
                })

            }
        }

        console.log(`${chalk.blueBright('> ')} All ${chalk.blueBright('events')} loaded.\n`)

    }

    public async loadCommands(dir: string) {

        const cmdFolder = fs.readdirSync(path.join(__dirname, dir))
    
        for (const subFolder of cmdFolder) {
    
            const files = fs.readdirSync(path.join(__dirname, dir, subFolder))
    
            for(let cmd of files) {
    
                cmd = cmd.split('.')[0]

                const command = (await(import(path.join(__dirname, dir, subFolder, cmd)))).default

                this.commands.push(command)
                
            }
        }

        console.log(`${chalk.magentaBright('> ')} All ${chalk.magentaBright('commands')} loaded.`)
        this.commands.forEach((cmd: Command) => { console.log(`${chalk.magentaBright('  - ')} ${cmd.params.name}`) })

    } 
}

const client = new n3x({ intents: 14159 })

client.login(config.token)
client.connectToMongo(config.mongoPath)
client.loadEvents('.././events')
client.loadCommands('.././cmds')

export default client