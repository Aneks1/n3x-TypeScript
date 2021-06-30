import client from "../n3x"
import chalk from "chalk"

class Event {
    public eventName: string = ''

    public run() {
        console.log(chalk.blueBright('> ') + 'Reading event ' + chalk.blueBright(this.eventName))
        client.on(this.eventName, (...args: any[]) => {
            this.execute(...args)
        })
    }

    public execute(...args: any[]): void {
        // So, in teh event files u need to do this.execute = function() and then u write the code
    }
    constructor({name = '', run = async function(...args:any[]) {} }) {
        this.eventName = name
        this.execute = run
    }
}

export default Event