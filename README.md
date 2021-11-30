![n3x](https://github.com/ItsAmex/n3x-TypeScript/blob/main/github/n3x-banner.png)

Ok, so i already made a [repository](https://github.com/ItsAmex/n3x) for n3x, but I see a lot of Discord Bots coded in JavaScript, but really, I have never seen a good bot with TypeScript before (it doesn't mean they don't exist), so here it is, n3x. dist is where the compiled typescript goes. I just use it to run the bot.

## Help

Create a file called `config.json` inside `src/util`. Then write this
```json
"token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", //Your bot's token
"mongoPath": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" //Your MongoDB path
```

This bot was created for my Discord Server, but you can always use it as a template, change prefix, change the amount of gained xp, the allowed channels, yea, you know. But please, don't upload it to any website for making public bots (like top.gg or those websites).

## Running the Bot

To compile all the files, run this command in the terminal:
```
$ tsc -p .
```

Now to run the bot just run:
```
$ node .
```