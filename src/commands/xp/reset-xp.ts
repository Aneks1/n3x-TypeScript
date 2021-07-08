import { MessageEmbed, MessageReaction, ReactionCollector, ReactionCollectorOptions, User } from "discord.js"
import Command from "../../handlers/command-handler"
import levelThing from "../../schemas/level-schema"
import { error } from '../../assets/emojis.json'

const timeEmbed = new MessageEmbed()
.setTitle('⏱ Time Out')
.setColor('#ff2d2d')
.setDescription('You ran out of time, please run the command again.')

const rankCommand = new Command({
    name: 'reset-xp',
    maxArgs: 1,
    minArgs: 0,
    expectedArgs: '<user>',
    run: async function (message) {
        const filter = (reaction: MessageReaction, user: User) => { return ['✅', '❎'].includes(reaction.emoji.name) && user.id === message.author.id }
        const user = message.mentions.users.first()

        const confirmMessage = await message.channel.send(new MessageEmbed().setTitle('❗ Please Confirm').setDescription(`Are you sure you want to reset levels and xp from the user ${user}? You CAN'T undo this action.`).setColor('#846bd6'))
        confirmMessage.react('✅')
        confirmMessage.react('❎')

        confirmMessage.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
                .then(async (collected: any) => {

                  const reaction = collected.first()
              
                if (reaction.emoji.name === '✅') {
                    let data = await levelThing.findOneAndDelete({ Guild: message.guild.id, User: user.id })
                    if(!data) { message.channel.send(new MessageEmbed().setTitle(error + `Error`).setDescription('That user doesn\'t have xp.').setColor('#ff2d2d')); return }
                    confirmMessage.delete()
                    message.channel.send(new MessageEmbed().setTitle('✅ Done!').setDescription(`${user}'s xp has been reset.`).setColor('#846bd6'))
                    return
                } else if (reaction.emoji.name === '❎') {
                    message.channel.send(new MessageEmbed().setTitle(`❎ Action Cancelled`).setDescription('You cancelled your action.').setColor('#846bd6'))
                    confirmMessage.delete()
                    return
                }
            })
            .catch(() => {  
                message.channel.send(timeEmbed)
                return
            })
    }
})

export default rankCommand