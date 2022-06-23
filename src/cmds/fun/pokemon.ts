import { Message, MessageEmbed } from "discord.js"
import Command from "../../Strucutres/Command"
import axios from 'axios'

const pokeCommand = new Command({
    name: 'pokemon',
    description: 'Get a pokemon',
    category: 'fun',
    minArgs: 1,
    maxArgs: 1,
    disabled: true,
    allowedChannels: ['744288105300885554']
},

async function (message: Message, args) {
    axios
    .get(`https://pokeapi.co/api/v2/pokemon/${args[0]}`)
    .then((res) => {

        let waekness = ''

        for(const type of res.data.types) {
            waekness = checkWeakness(type.type.name)
        }

        const pokeEmbed = new MessageEmbed()
        .setTitle('**' + res.data.species.name.charAt(0).toUpperCase() + res.data.species.name.slice(1) + '**')
        .setDescription('**Types: **' + res.data.types[0].type.name.charAt(0).toUpperCase() + res.data.types[0].type.name.slice(1) + (res.data.types[1] != undefined ? ' - ' + res.data.types[1].type.name.charAt(0).toUpperCase() + res.data.types[1].type.name.slice(1) : '') + '\n**Weakness: **' + waekness)
        .setColor('#846bd6')
        .setThumbnail(res.data.sprites.front_default)

        message.channel.send({ embeds: [pokeEmbed] })
    })
    .catch((err) => {
        message.channel.send('That Pokémon doesn\'t exist')
    })

    function checkWeakness(type: string): string {
        switch (type) {
            case 'normal':
                return 'Rock - Steel'
            case 'electric':
                return 'Grass - Electric - Dragon'
        }

        return ''
    }
})

export default pokeCommand