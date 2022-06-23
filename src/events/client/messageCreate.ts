
// [    Imports    ] \\

import { Message, MessageEmbed } from 'discord.js'
import levels from '../../features/levels'
import Event from '../../Strucutres/Event'
import countThing from '../../mongoSchemas/count-schema'
import guildThing from '../../mongoSchemas/guild-schema'
import client from '../../n3x'
import Command from '../../Strucutres/Command'
import emojis from '../../assets/emojis'
import runCommand from '../../Utils/run-command'

const messageEvent = new Event(

'messageCreate',

async function(message: Message) {

    // This is to handle commands
    const data = await guildThing.findOne({ Guild: message.guild?.id })

    let prefix = data?.Prefix
    if(!data || !prefix) prefix = 'n!'

    if(message.content.startsWith(prefix)) {

        const name = message.content.split(' ')[0].toLowerCase()

        const command = client.commands.find((cmd: Command) => { 
            
            return cmd.params.name == name!.replace(prefix!, '')
        
        })

        if(!command) { 
            message.reply(
                {
                    embeds: [
                        new MessageEmbed()
                        .setTitle(emojis.fordibben + ' Error')
                        .setDescription("That command doesn't exist.")
                        .setColor('#ff2d2d')
                    ]
                }
            )

            return
        }

        if(message.content.startsWith(prefix + command.params.name)) {

            runCommand(message, command)

        }

    }


    // [    Counting    ] \\

    if(message.channel.id == '843162306128511006') {

        let data = await countThing.findOne(    {   Guild: message.guild!.id    }   )

        if(!data && message.content == '1') {

            data = new countThing(
                { 
                    id: message.author.id, 
                    Guild: message.guild!.id, 
                    Current: 1 
                }
            )
            
            data.save() 
        }

        else if(data) { 
            
            const numCount = parseInt(message.content)

            if(data.Current + 1 == numCount && data.id != message.author.id) {
                
                data = await countThing.findOneAndUpdate(
                    { 
                        id: message.author.id, 
                        Guild: message.guild!.id, 
                        Current: numCount
                    }
                )
                
                data!.save()
            
            }

            else { message.delete() }
        }
    }

        //And this is for leveling up
    if (['743822809410830400', '769227400969191444', '810899508518060033', '744288105300885554', '882253605623713812'].includes(message.channel.id)) {
        levels(message)
    } 

    // [    If bot gets a ping    ] \\
    if(['<@!831905867687395401>', '<@831905867687395401>'].includes(message.content)) {

        let data = await guildThing.findOne(    {   Guild: message.guild?.id    }   )

        let prefix = data?.Prefix || 'n!'

        message.reply(
            {
                embeds: [
                    new MessageEmbed()
                    .setTitle(':gear: Hi, I\'m n3x')
                    .setDescription(`My guild prefix is \`${prefix}\`. Use \`help\` to view all my commands.`)
                    .setColor('#846bd6')
                ] 
            }
        )
    }
}
)

export default messageEvent