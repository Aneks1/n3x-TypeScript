# n3x (TypeScript Version)

Ok, so i already made a [repository](https://github.com/ItsAmex/n3x) for n3x. But I was bored (yea, surprise) and I changed all to TypeScript because TypeScript is cool. Now n3x is in English and coded in TypeScript.

. . . I think I should teach you how to use some things.
So, this is how you add an event:

```ts
class thisIsAnEvent extends Event {
    constructor() {
        super()
        this.eventName = 'insertEventName'

        this.execute = async function() {
            //All your code goes here :D
        }
    }
}

export default thisIsAnEvent
```

UPDATE: I just realized that there is an easier way to make the event handler, so I'll be working on that the next hours.
