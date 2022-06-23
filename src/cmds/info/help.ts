import { ColorResolvable, Message, MessageEmbed } from "discord.js"
import Command from "../../Strucutres/Command"
import client from "../../n3x"
import colors from "../../assets/colors"

const helpCommand = new Command({ 
    
    name: 'help', 
    description: 'Shows all commands.',
    category: 'info',
    minArgs: 0,
    maxArgs: 0,

}, 

async function (message: Message) {

    const categories = ['fun', 'misc', 'mod', 'xp' , 'info', 'config']
    const titles = ['🌟 Fun', '📍 Miscellaneous', '🔨 Moderation', '⏫ XP', '📘 Info', '⚙ Config' ]
        
    const helpEmbed =  new MessageEmbed()

                        .setTitle('n3x\'s Commands')
                        .setColor(colors.purple as ColorResolvable)


    for(let i = 0; i < categories.length; i++) {

        helpEmbed.addField(

            titles[i],
            client.commands

                .filter((cmd: Command) => cmd.params.category == categories[i] && cmd.params.disabled == false )
                .map((cmd: Command) => { 
                    
                    return `\`${cmd.params.name}\` - ${cmd.params.description}` 
                
                })
                .join('\n')

        )

    }

    message.channel.send(   {   embeds: [   helpEmbed   ]   }   )

})

export default helpCommand