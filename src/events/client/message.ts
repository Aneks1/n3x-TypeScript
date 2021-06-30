import { Message } from 'discord.js'
import Event from '../../handlers/event-handler'
import countThing from '../../schemas/count-schema'

const messageEvent = new Event({
    name: 'message',
    run: async function(message: Message) {
        //All this code is for counting.
        if(message.guild && message.channel.id == '843162306128511006') {
            let data = await countThing.findOne({ Guild: message.guild.id })
            if(!data && message.content == '1') { data = new countThing({ id: message.author.id, Guild: message.guild.id, Current: 1 }); data.save() }
            else if(data) { 
                const numCount = parseInt(message.content)
                if(data == null) return
                if(!Number.isNaN(numCount) && (data.Current + 1 == numCount && data.id != message.author.id)) { data = await countThing.findOneAndUpdate({ id: message.author.id, Guild: message.guild.id, Current: numCount}); console.log('New current number ' + numCount); if(data != null) data.save()}
                else { message.delete() }
            } else { message.delete()}
        }
    }
})

export default messageEvent