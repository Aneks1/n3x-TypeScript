import { Guild } from 'discord.js';
import Event from '../../Strucutres/Event'
import guildThing from '../../mongoSchemas/guild-schema'

const readyEvent = new Event(

    'guildCreate',

    async function(guild: Guild) {

        let data = await guildThing.findOne({ Guild: guild.id })

        if(!data) { data = new guildThing({ Guild: guild.id, Prefix: 'n!' }); data.save() }
        
    }
)

export default readyEvent