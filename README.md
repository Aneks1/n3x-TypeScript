# [n3x](https://github.com/ItsAmex/n3x/blob/main/github/banner.png)

Ok, so i already made a [repository](https://github.com/ItsAmex/n3x) for n3x. But I was bored (yea, surprise) and I changed all to TypeScript because TypeScript is cool. Now n3x is in English and coded in TypeScript.

. . . I think I should teach you how to use some things.
So, this is how you add an event:

```ts
import Event from '../../handlers/event-handler'

const thisIsAnEvent = new Event({
    name: 'insertEventName',
    run: async function() {
        // Ur code here
    }
})

export default thisIsAnEvent
```

And this is how you add a command:
```ts
import Command from '../../handlers/command-handler'

const thisIsACommand = new Command({
    name: 'insertCommandName',
    // Here u add all the parameters.
    run: async function() {
        // Ur code here
    }
})

export default thisIsACommand
```

## Command Parameters

```
name: ''
permissions: ['']
disabled: false
guildCommand: true
requiredRoles: ['']
allowedChannels: ['']
expectedArgs: ''
minArgs: 0
maxArgs: 0
```

Ignore user-pfp.png, i added it to .gitignore but doesnt work.