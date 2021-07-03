import { Guild } from 'discord.js';
import Event from '../../handlers/event-handler'
import guildThing from '../../schemas/guild-schema'

const readyEvent = new Event({
    name: 'guildCreate',
    run: async function(guild: Guild) {
        let data = await guildThing.findOne({ Guild: guild.id })
        if(!data) { data = new guildThing({ Guild: guild.id, Prefix: 'n!' }); data.save() }
    }
})

export default readyEvent