import { Message, MessageEmbed } from "discord.js"
import Command from "../../Strucutres/Command"
import axios from 'axios'

const dogCommand = new Command({

    name: 'dog',
    description: 'Sends a random dog image.',
    category: 'fun',
    allowedChannels: ['744288105300885554'],
    minArgs: 0,
    maxArgs: 0,

},

async function (message: Message) {

    const data = await (await (axios.get('https://api.thedogapi.com/v1/images/search'))).data

    message.channel.send({

        embeds: [ 
            
            new MessageEmbed()
            .setTitle('🐶 Image of a dog.')
            .setImage(data[0].url)
            .setColor('#846bd6')
            
        ]
    })
})

export default dogCommand