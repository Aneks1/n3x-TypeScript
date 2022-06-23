import chalk from 'chalk'
import client from '../../n3x'
import Event from '../../Strucutres/Event'

const readyEvent = new Event(
    'ready',
    async function() {

        console.log(`\n${chalk.greenBright(`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()} ${new Date().toLocaleTimeString()}`)} - n3x is online. Made by Aneks.`)

        const randomStatus = function() {

            const statusArray: [string, "PLAYING" | "PLAYING" | "WATCHING"][] = [
                [
                    'n!help', 
                    'PLAYING'
                ], 
                [
                    'Made by Aneks', 
                    'PLAYING'
                ], 
                [
                    'Aneks Planet', 
                    'WATCHING'
                ]
            ]

            let statusRandom = Math.floor(Math.random() * statusArray.length)

            client.user!.setActivity(
                
                statusArray[statusRandom][0], 
                { 

                    type: statusArray[statusRandom][1]

                }
            )
        }
        
        setInterval(randomStatus, 30000)

    }
)

export default readyEvent