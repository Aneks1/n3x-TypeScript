
class Event {

    public readonly name: string = ''

    constructor(name: string, run = async function(...args:any[]) {}) {

        this.name   = name
        this.run    = run
        
    }

    public run(...args: any[]) {

        throw new Error(`Event "${this.name}" is missing "run" function.`)

    }

}


export default Event