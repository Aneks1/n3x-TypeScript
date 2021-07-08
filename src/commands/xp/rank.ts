import { MessageEmbed } from "discord.js"
import Command from "../../handlers/command-handler"
import levelThing from "../../schemas/level-schema"
import { error } from '../../assets/emojis.json'

const rankCommand = new Command({
    name: 'rank',
    maxArgs: 1,
    minArgs: 0,
    expectedArgs: '[user]',
    allowedChannels: ['744288105300885554'],
    run: async function (message) {
        const user = message.mentions.users.first() || message.member
        let data = await levelThing.findOne({ Guild: message.guild.id, User: user.id })
        if(!data) { new MessageEmbed().setTitle(error + `Error`).setDescription('You are not ranked yet, send some messages first.').setColor('#ff2d2d'); return }
        message.channel.send(new MessageEmbed().setTitle(`🏆 ${message.author.username}'s Rank`).addField('**XP: **', data.xp).addField('**Level: **', data.level).addField('**Next Level: **', data.toLevelUp - data.xp).setColor('#846bd6'))
    }
})

export default rankCommand