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

Um, yea, I think I will add more things in the future. Yea, with future i mean that in 3 hours I will add the command handler, the load commands and all the commands from the JavaScript version of n3x. 

I think I will also update this README.

I'm doing this in class and I need to finish the exam, so cya later :P
