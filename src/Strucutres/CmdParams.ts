export default interface CmdParams {

    name: string
    description: string
    category: 'fun' | 'mod' | 'xp' | 'info' | 'misc' | 'config'

    minArgs: number
    maxArgs: number

    permissions?: string[]
    disabled?: boolean
    guildCommand?: boolean | null
    requiredRoles?: string[] 
    allowedChannels?: string[]
    expectedArgs?: string

}