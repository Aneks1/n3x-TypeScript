import { Message, MessageEmbed } from "discord.js"
import Command from "../../handlers/command-handler"

const timeEmbed = new MessageEmbed()
.setTitle('⏱ Time Out')
.setColor('#ff2d2d')
.setDescription('You ran out of time, please run the command again.')

const memory = new Command({
    name: 'memory',
    guildCommand: true,
    run: async function (message: Message, args: string[]) {
        const randomNumber = Math.floor(Math.random() * (999999 - 100000) + 100000)
        const msg = await message.channel.send(new MessageEmbed().setTitle('🧠 Memory Game').setDescription(randomNumber).setColor('#846bd6'))
        setTimeout(async () => { 
            msg.delete()
            message.channel.send(new MessageEmbed().setTitle('🧠 Memory Game').setDescription('Write the number that I sent.').setColor('#846bd6'))
            const filter = (m: Message) => m.author.id == message.author.id
        
            message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] }).catch(() => { message.channel.send(timeEmbed); return }).then((collected: any) => {
                if(collected.first().content == randomNumber) { message.channel.send(new MessageEmbed().setTitle('✅ Correct').setDescription('You guessed the number!').setColor('#00ff44')); return }
                else { message.channel.send(new MessageEmbed().setTitle('❌ Incorrect').setDescription('Oh, you failed.').setColor('#ff0000')); return }
            })
        }, 2000)
    }
})

export default memory