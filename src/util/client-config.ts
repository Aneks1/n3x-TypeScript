//i don't need to explain this
import { Client, Collection } from 'discord.js'
import confiJson from './config.json'
import mongoose from 'mongoose'
import chalk from 'chalk'
import loadEvents from '../handlers/load-events'

//this is a class
export default class n3x extends Client {
    //this is a token
    private typeUrTokenHere = ''
    private pathForMongo = ''

    //this is a function
    public start(token: string) {

        //this defines token
        this.typeUrTokenHere = token

        //this makes the bot log in
        this.login(this.typeUrTokenHere)
    }

    //Please read the function name
    public connectToMongo(mongoPath: string) {
            
        this.pathForMongo = mongoPath

        try {
            mongoose.connect(this.pathForMongo, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => { console.log(chalk.greenBright('> ') + 'Conected to ' + chalk.greenBright('MongoDB')) })
        } catch(err) {
            console.log(err)
        }
    }

    public loadEvents() {
        ['client', 'guild'].forEach(e => loadEvents(e))
    }
}

export const client = new n3x()
client.start(confiJson.token)
client.connectToMongo(confiJson.mongoPath)
client.loadEvents()