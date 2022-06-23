import { Message, MessageAttachment, MessageEmbed } from "discord.js"
import Command from "../../Strucutres/Command"
import Canvas from 'canvas'

const timeEmbed = new MessageEmbed()
.setTitle('⏱ Time Out')
.setColor('#ff2d2d')
.setDescription('You ran out of time, please run the command again.')

const memory = new Command({
    name: 'memory',
    description: 'Memory game.',
    category: 'fun',
    minArgs: 0,
    maxArgs: 0,
    guildCommand: true
},

async function (message: Message, args: string[]) {

    const randomNumber = Math.floor(Math.random() * (999999 - 100000) + 100000)

    const canvas = Canvas.createCanvas(600, 300)
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "black"
    ctx.font = '180px calibri'
    ctx.fillText(randomNumber.toString(), canvas.width / 2 - ctx.measureText(randomNumber.toString()).width / 2, canvas.height/ 2 + canvas.height / 4)

    const img = new MessageAttachment(canvas.toBuffer(), 'number.png')

    message.channel.send({

        embeds: [

            new MessageEmbed()

                .setTitle('🧠 Memory Game')
                .setColor('#846bd6')

        ]
    })
    const msg = await message.channel.send({ files: [ img ] })

    setTimeout(async () => {

        msg.delete()

        message.channel.send({

            embeds: [

                new MessageEmbed()
                .setTitle('🧠 Memory Game')
                .setDescription('Write the number that I sent.')
                .setColor('#846bd6')
            ]
        })

        const filter = (m: Message) => m.author.id == message.author.id
    
        message.channel.awaitMessages({ 
            
            filter, 
            max: 1, 
            time: 10000, 
            errors: ['time'] 
        
        })
        
        .catch(() => { 
            
            message.channel.send({

                embeds: [ timeEmbed ]
            })

            return 
        })
        
        .then((collected: any) => {

            if(!collected) return

            if(collected.first().content == randomNumber) { 
                
                message.channel.send({
                    
                    embeds: [ 

                        new MessageEmbed()
                        .setTitle('✅ Correct')
                        .setDescription('You guessed the number!')
                        .setColor('#00ff44')
                    ]
                })
                
                return 
            }
            
            else { 
                
                message.channel.send({

                    embeds: [

                        new MessageEmbed()
                        .setTitle('❌ Incorrect')
                        .setDescription('Oh, you failed.')
                        .setColor('#ff0000')
                    ]
                })
                
                return
            }
        })
    }, 
    
    2000
    
    )
})

export default memory