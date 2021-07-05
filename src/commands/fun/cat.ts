import { MessageEmbed } from "discord.js"
import Command from "../../handlers/command-handler"
import axios from 'axios'

const catCommand = new Command({
    name: 'cat',
    allowedChannels: ['744288105300885554'],
    run: async function (message) {
        axios
        .get('https://api.thecatapi.com/v1/images/search')
        .then((res) => {
          const catEmbed = new MessageEmbed()
            .setTitle('😺 Image of a cat.')
            .setImage(res.data[0].url)
            .setColor('#846bd6')
          message.channel.send(catEmbed)
        })
        .catch((err) => {
          console.error('ERR:', err)
        })
    }
})

export default catCommand