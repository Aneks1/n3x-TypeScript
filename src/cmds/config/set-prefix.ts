import { Message, MessageEmbed } from "discord.js"
import Command from "../../Strucutres/Command"
import guildThing from "../../mongoSchemas/guild-schema"

const setprefixCommand = new Command({
    name: 'set-prefix',
    description: 'Sets the server prefix for the bot.',
    category: 'config',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<prefix>',
    guildCommand: true,
    permissions: ['ADMINISTRATOR']
},

async function (message: Message, args: string[]) {

    let data = await guildThing.findOneAndUpdate({ Guild: message.guild?.id, Prefix: args[0] })

    if(!data) { data = new guildThing({ Guild: message.guild?.id, Prefix: args[0] }); data.save(); message.channel.send({ embeds: [new MessageEmbed().setTitle(':gear: Prefix Changed').setDescription('Server prefix was changed to ' + args[0]).setColor('#846bd6')]}); return }
    if(data != null) data.save()
    
    message.channel.send({ embeds: [new MessageEmbed().setTitle(':gear: Prefix Changed').setDescription(`Server prefix was changed to `+ '`' + args[0] + '`.').setColor('#846bd6')]})
})

export default setprefixCommand