import { MessageAttachment, MessageEmbed } from "discord.js"
import Command from "../../handlers/command-handler"
const petThe = require('pet-pet-gif') // didn't work with import :/

const petCommand = new Command({
    name: 'pet-the',
    maxArgs: 1,
    minArgs: 0,
    expectedArgs: '[user]',
    allowedChannels: ['744288105300885554'],
    run: async function (message) {
        const member = message.mentions.members.first() || message.member
        const avatar = member.user.displayAvatarURL({ format: 'png' })

        const animatedGif = await petThe(avatar)
        const gifAttachment = new MessageAttachment(animatedGif, `pet the ${member.user.username}.gif`)
        const msg = await message.channel.send(gifAttachment)
        msg.attachments.forEach((attachment: any) => {
            const imageLink = attachment.proxyURL
            msg.delete()
            const embed = new MessageEmbed().setTitle(`Pet The ${member.user.username}`).setColor('#846bd6').setImage(imageLink)
            message.channel.send(embed)
        })
    }
})

export default petCommand