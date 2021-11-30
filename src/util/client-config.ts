import { Client } from 'discord.js'
import confiJson from './config.json'
import mongoose from 'mongoose'
import chalk from 'chalk'
import loadEvents from '../handlers/load-events'
import loadCommands from '../handlers/load-commands'

export default class n3x extends Client {
    public connectToMongo(mongoPath: string) {
        mongoose.connect(mongoPath, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        .then(() => { console.log(chalk.greenBright('> ') + 'Conected to ' + chalk.greenBright('MongoDB')) })
        .catch((err: Error) => console.log(err))
    }

    public loadEvents() {
        loadEvents('.././events')
        console.log(chalk.blueBright('> ') + 'All ' + chalk.blueBright('events') + ' loaded.')
    }

    public loadCommands() {
        loadCommands('.././commands')
        .then(() => console.log(chalk.magentaBright('> ') + 'All ' + chalk.magentaBright('commands') + ' loaded.'))
    } 
}

export const client = new n3x({ intents: 14159 })
client.login(confiJson.token)
client.connectToMongo(confiJson.mongoPath)
client.loadEvents()
client.loadCommands()