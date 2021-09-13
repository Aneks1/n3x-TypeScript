import { Message, MessageEmbed } from 'discord.js'
import Event from '../../handlers/event-handler'
import countThing from '../../schemas/count-schema'
import levelThing from '../../schemas/level-schema'
import guildThing from '../../schemas/guild-schema'

const messageEvent = new Event({
    name: 'messageCreate',
    run: async function(message: Message) {

        //All this code is for counting.
        if(message.guild && message.channel.id == '843162306128511006') {
            let data = await countThing.findOne({ Guild: message.guild.id })
            if(!data && message.content == '1') { data = new countThing({ id: message.author.id, Guild: message.guild.id, Current: 1 }); data.save() }
            else if(data) { 
                const numCount = parseInt(message.content)
                if(data == null) return
                if(!Number.isNaN(numCount) && (data.Current + 1 == numCount && data.id != message.author.id)) { data = await countThing.findOneAndUpdate({ id: message.author.id, Guild: message.guild.id, Current: numCount}); console.log('New current number ' + numCount); if(data != null) data.save() }
                else { message.delete() }
            } else { message.delete()}
        }
         //And this is for leveling up
        if (message.channel.id == '743822809410830400', '769227400969191444', '810899508518060033', '744288105300885554') {
            if(message.author.bot) { return }
            const xp = Math.floor(Math.random() * (9 - 3) + 3)
            let data = await levelThing.findOne({ Guild: message.guild?.id, User: message.author.id })
            if(!data) { data = new levelThing({ Guild: message.guild?.id, User: message.author.id, xp: xp, level: 1, toLevelUp: 100 }); data.save(); return }
            data.toLevelUp = (data.level + 1) * (100 / 2)
            data.xp = data.xp + xp
            if(data.xp >= data.toLevelUp) { data.level ++; data.xp = 0; message.channel.send(new MessageEmbed().setTitle(`⏫ ${message.author.username} Has Leveled Up`).setDescription(`You have leveled up to level ${data.level}`).setColor('#846bd6')) }
            data.save()
        } 
        if(message.content == '<@!831905867687395401>') {
            let data = await guildThing.findOne({ Guild: message.guild?.id })
            let prefix = data?.Prefix || '$'
            message.channel.send(new MessageEmbed().setTitle(':gear: Hi, I\'m n3x').setDescription('My guild prefix is ' + '`' + prefix + '`. Use `help` to view all my commands.').setColor('#846bd6'))
        }
    }
})

export default messageEvent