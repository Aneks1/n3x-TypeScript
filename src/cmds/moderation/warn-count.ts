import { Message, MessageEmbed } from "discord.js"
import Command from '../../Strucutres/Command'
import warnThing from "../../mongoSchemas/warn-schema"

const setprefixCommand = new Command({

    name: 'warn-count',
    description: 'Shows how many warns a member has.',
    category: 'mod',
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: '<member>',
    guildCommand: true,
    permissions: ['ADMINISTRATOR'],

},

async function (message: Message) {

    const member = message.mentions.members?.first() || message.member
    let data = await warnThing.findOne({ Guild: message.guild?.id, User: member?.id })

    if(!data) {
        message.channel.send(
            {
                embeds: [
                    new MessageEmbed().setTitle(`📜 ${member?.user.username}'s Warns`).setDescription(`${member} has no warns`).setColor('#846bd6')
                ]
            }
        )

        return
    }
            

    message.channel.send(
        {
            embeds: [
                new MessageEmbed().setTitle(`📜 ${member?.user.username}'s Warns`).setDescription(`${member} currently has ${data.warns} warns.`).setColor('#846bd6')
            ]
        }
    )
})

export default setprefixCommand