
// [    Imports    ] \\

import { Message } from "discord.js"
import CmdParams from "./CmdParams"

class Command {

    public readonly params: CmdParams

    constructor(cmdParams: CmdParams, run = async function(...args: any[]) {}) {
        
        this.params = cmdParams

        this.params.allowedChannels = cmdParams.allowedChannels || ['']
        this.params.expectedArgs    = cmdParams.expectedArgs    || ''

        this.params.guildCommand    = cmdParams.guildCommand    || null

        this.params.permissions     = cmdParams.permissions     || ['']
        this.params.requiredRoles   = cmdParams.requiredRoles   || ['']

        this.params.disabled        = cmdParams.disabled        || false

        this.run = run

    }

    public run(...args: any[]) {

        throw new Error(`Command "${this.params.name}" is missing "run" function.`)

    }


    // [    Check Params    ] \\

    public checkParams(message: Message) {


        // [    Roles    ] \\

        for(const roleID of this.params.requiredRoles!) {

            if(roleID == '') return

            if(!message.guild?.roles.cache.get(roleID))
                
                throw new Error(`Unknown role id ${roleID}. (Please consider using the role id and check that it's a valid id)`)

        }


        // [    Channels    ] \\

        for(const channelID of this.params.allowedChannels!) {
            
            if(channelID == '') return

            if(!message.guild?.channels.cache.get(channelID))
                
                throw new Error(`Unknown guild channel id ${channelID}. (Please consider using the channel id and check that it's a valid id)`) 

        }
    }
}


export default Command