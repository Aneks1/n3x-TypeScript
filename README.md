# n3x (TypeScript Version)

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

Yea, there was an easier way to make the event handler, so I added the new way to make a new event.
Working on command handler.
