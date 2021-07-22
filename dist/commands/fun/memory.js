"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command_handler_1 = __importDefault(require("../../handlers/command-handler"));
const timeEmbed = new discord_js_1.MessageEmbed()
    .setTitle('⏱ Time Out')
    .setColor('#ff2d2d')
    .setDescription('You ran out of time, please run the command again.');
const memory = new command_handler_1.default({
    name: 'memory',
    guildCommand: true,
    run: function (message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const randomNumber = Math.floor(Math.random() * (999999 - 100000) + 100000);
            const msg = yield message.channel.send(new discord_js_1.MessageEmbed().setTitle('🧠 Memory Game').setDescription(randomNumber).setColor('#846bd6'));
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                msg.delete();
                message.channel.send(new discord_js_1.MessageEmbed().setTitle('🧠 Memory Game').setDescription('Write the number that I sent.').setColor('#846bd6'));
                const filter = (m) => m.author.id == message.author.id;
                message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] }).catch(() => { message.channel.send(timeEmbed); return; }).then((collected) => {
                    if (collected.first().content == randomNumber) {
                        message.channel.send(new discord_js_1.MessageEmbed().setTitle('✅ Correct').setDescription('You guessed the number!').setColor('#00ff44'));
                        return;
                    }
                    else {
                        message.channel.send(new discord_js_1.MessageEmbed().setTitle('❌ Incorrect').setDescription('Oh, you failed.').setColor('#ff0000'));
                        return;
                    }
                });
            }), 2000);
        });
    }
});
exports.default = memory;
