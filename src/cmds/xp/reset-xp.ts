import { Message, MessageEmbed, MessageReaction, ReactionCollector, ReactionCollectorOptions, User } from "discord.js"
import Command from "../../Strucutres/Command"
import levelThing from "../../mongoSchemas/level-schema"
import emojis from '../../assets/emojis'

const timeEmbed = new MessageEmbed()
.setTitle('⏱ Time Out')
.setColor('#ff2d2d')
.setDescription('You ran out of time, please run the command again.')

const rankCommand = new Command({
    name: 'reset-xp',
    description: 'Resets a user\'s XP.',
    category: 'xp',
    maxArgs: 1,
    minArgs: 1,
    expectedArgs: '<user>',
    guildCommand: true,
},

async function (message: Message) {
        
    const filter = (reaction: MessageReaction, user: User) => { 
        
        return ['✅', '❎'].includes(reaction.emoji.name!) && user.id === message.author.id 
    
    }

    const user = message.mentions.users.first()

    if(user == message.author) { 

        message.reply({ 

            embeds: [

                new MessageEmbed()
                .setTitle(emojis.fordibben + ' Error')
                .setDescription('You can\'t reset your own xp')
                .setColor('#ff2d2d')

            ] 

        })
    }

    const confirmMessage = await message.channel.send({

        embeds: [
            
            new MessageEmbed()
            .setTitle('❗ Please Confirm')
            .setDescription(`Are you sure you want to reset levels and xp from the user ${user}? You CAN'T undo this action.`)
            .setColor('#846bd6')

        ]
    })

    confirmMessage.react('✅')
    confirmMessage.react('❎')

    confirmMessage.awaitReactions({ filter, max: 1, time: 15000, errors: ['time'] })

            .then(async (collected: any) => {

                const reaction = collected.first()
            
            if (reaction.emoji.name === '✅') {

                let data = await levelThing.findOneAndDelete({ 
                    
                    Guild: message.guild!.id, 
                    User: user!.id 
                
                })

                if(!data) { 
                    message.channel.send({
                        
                        embeds: [
                            
                            new MessageEmbed()
                            .setTitle(emojis.fordibben + `Error`)
                            .setDescription('That user doesn\'t have xp.')
                            .setColor('#ff2d2d')
                        ]
                })
                
                confirmMessage.delete()
                return
            
            }

                confirmMessage.delete()

                message.channel.send({
                    
                    embeds: [
                        
                        new MessageEmbed()
                        .setTitle('✅ Done!')
                        .setDescription(`${user}'s xp has been reset.`)
                        .setColor('#846bd6')

                    ]

                })

                return

            } 
            
            else if (reaction.emoji.name === '❎') {

                message.channel.send({
                    
                    embeds: [
                        
                        new MessageEmbed()
                        .setTitle(`❎ Action Cancelled`)
                        .setDescription('You cancelled your action.')
                        .setColor('#846bd6')
                        
                    ]
                })

                confirmMessage.delete()
                return

            }
        })

        .catch(() => {

            message.channel.send({ embeds: [ timeEmbed ] })
            return

        })
})

export default rankCommand