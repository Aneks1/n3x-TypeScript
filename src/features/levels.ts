import levelThing from '../schemas/level-schema'
import { Message, MessageEmbed } from 'discord.js'

const roleIds = [
    '810179692467847178', 
    '810179786844405760', 
    '810179939907010560', 
    '810180117945909248', 
    '810180268983582730', 
    '810180409265618954', 
    '810180428077596673', 
    '810180446482595840', 
    '810180464231841833', 
    '810180511065964554'
]

export default async function levels(message: Message) {

    if(message.author.bot) return

    const xp = Math.floor(Math.random() * (9 - 3) + 3)

    let data = await levelThing.findOne(
        {
            Guild: message.guild?.id, 
            User: message.author.id 
        }
    )

    if(!data) {
        data = new levelThing(
            {
                Guild: message.guild?.id, 
                User: message.author.id, xp: xp, level: 1, 
                toLevelUp: 100 
            }
        )
        data.save()
        return
    }

    data.xp += xp

    if(data.xp >= data.toLevelUp) { 

        data.level ++
        data.toLevelUp = (data.level + 1) * 75
        data.xp = 0

        console.log(data)
        
        message.reply(
            {
                embeds: [
                    new MessageEmbed()
                    .setTitle(`⏫ ${message.author.username} Has Leveled Up`)
                    .setDescription(`You have leveled up to level ${data.level}`)
                    .setColor('#846bd6')
                ]
            }
        )  
        
        const orderInArray = Math.floor(data.level / 5) - 1

        if(orderInArray < 0) { 
            data.save()
            return
        }

        const roleID = roleIds[orderInArray]
        console.log(roleID)

        const roleToAdd = message.guild!.roles.cache.get(roleID)

        if(!message.member?.roles.cache.has(roleID!)) {
            message.member?.roles.add(roleToAdd!)
        }
    }
    data.save()
}