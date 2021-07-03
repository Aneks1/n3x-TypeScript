import { Message, MessageEmbed } from "discord.js"
import Command from "../../handlers/command-handler"
import axios from 'axios'

const dogCommand = new Command({
    commandName: 'dog',
    allowedChannels: ['744288105300885554'],
    run: async function (message) {
        axios
        .get('https://api.thedogapi.com/v1/images/search')
        .then((res: any) => {
          const catEmbed = new MessageEmbed()
            .setTitle('🐶 Image of a dog.')
            .setImage(res.data[0].url)
            .setColor('#846bd6')
          message.channel.send(catEmbed)
        })
        .catch((err: string) => {
          console.error('ERR:', err)
        })
    }
})

export default dogCommand