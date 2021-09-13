import client from "../n3x"
import chalk from "chalk"

class Event {
    private eventName: string = ''

    public run() {
        client.on(this.eventName, (...args: any[]) => {
            this.execute(...args)
        })
    }

    private execute(...args: any[]): void {
        // So, in teh event files u need to do this.execute = function() and then u write the code
    }
    constructor({name = '', run = async function(...args:any[]) {} }) {
        this.eventName = name
        this.execute = run
    }
}

export default Event