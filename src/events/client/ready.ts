import gradient from 'gradient-string'
import client from '../../n3x'
import Event from '../../handlers/event-handler'

const readyEvent = new Event({
    name: 'ready',
    run: async function() {
        const randomStatus = function() {
            const statusArray: [string, "PLAYING" | "PLAYING" | "WATCHING"][] = [
                [
                    'n!help', 
                    'PLAYING'
                ], 
                [
                    'Made by Amex', 
                    'PLAYING'
                ], 
                [
                    'Amex Lounge', 
                    'WATCHING'
                ]
            ]

            let statusRandom = Math.floor(Math.random() * statusArray.length)

            client.user?.setActivity(
                statusArray[statusRandom][0], 
                { 
                    type: statusArray[statusRandom][1]
                }
            )
        }
        
        setInterval(randomStatus, 30000)

        console.log(gradient('#aa00ff', '#00f2ff')([
            '                                                     ',
            '          ▄▄           ███████    ▄▄▄     ▄▄▄        ',
            '          ██▀▀▀▀▀█▄   ██     ██     ▀█▄ ▄█▀          ',
            '          ██     ██        ███        ███            ',
            '          ██     ██   ██     ██     ▄█▀ ▀█▄          ',
            '          ▀▀     ▀▀    ███████    ▀▀▀     ▀▀▀        ',
            '                                                     '
        ].join('\n')))
    }
})

export default readyEvent