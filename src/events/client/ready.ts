import gradient from 'gradient-string'
import client from '../../n3x'
import Event from '../../handlers/event-handler'

class ReadyEvent extends Event {
    constructor() {
        super()
        this.eventName = 'ready'

        this.execute = function() {
            const randomStatus = function() {
                const statusArray: [[string, number], [string, number], [string, number]] = [['n!help', 0], ['Made by Amex', 0], ['Amex Lounge', 2]]
                let statusRandom = Math.floor(Math.random() * statusArray.length)
                client.user?.setActivity(statusArray[statusRandom][0], { type: statusArray[statusRandom][1] })
            }; setInterval(randomStatus, 30000)

            console.log(gradient('#aa00ff', '#00f2ff')(
                [
                    '                                                     ',
                    '          ▄▄           ███████    ▄▄▄     ▄▄▄        ',
                    '          ██▀▀▀▀▀█▄   ██     ██     ▀█▄ ▄█▀          ',
                    '          ██     ██        ███        ███            ',
                    '          ██     ██   ██     ██     ▄█▀ ▀█▄          ',
                    '          ▀▀     ▀▀    ███████    ▀▀▀     ▀▀▀        ',
                    '                                                     '
                ].join('\n')))
        }
    }
}

export default ReadyEvent