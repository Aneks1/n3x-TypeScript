import { Message, MessageEmbed } from "discord.js"
import Command from "../../handlers/command-handler"
import warnThing from "../../schemas/warn-schema"

const setprefixCommand = new Command({
    name: 'warn-count',
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: '<member>',
    guildCommand: true,
    permissions: ['ADMINISTRATOR'],
    run: async function (message: Message) {
        const member = message.mentions.members?.first() || message.member
        let data = await warnThing.findOne({ Guild: message.guild?.id, User: member?.id })
        if(!data) { message.channel.send( new MessageEmbed().setTitle(`📜 ${member?.user.username}'s Warns`).setDescription(`${member} has no warns`).setColor('#846bd6')); return }

        message.channel.send(new MessageEmbed().setTitle(`📜 ${member?.user.username}'s Warns`).setDescription(`${member} currently has ${data.warns} warns.`).setColor('#846bd6'))
    }
})

export default setprefixCommand