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
const level_schema_1 = __importDefault(require("../../schemas/level-schema"));
const emojis_json_1 = require("../../assets/emojis.json");
const timeEmbed = new discord_js_1.MessageEmbed()
    .setTitle('⏱ Time Out')
    .setColor('#ff2d2d')
    .setDescription('You ran out of time, please run the command again.');
const rankCommand = new command_handler_1.default({
    name: 'reset-xp',
    maxArgs: 1,
    minArgs: 0,
    expectedArgs: '<user>',
    run: function (message) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = (reaction, user) => { return ['✅', '❎'].includes(reaction.emoji.name) && user.id === message.author.id; };
            const user = message.mentions.users.first();
            const confirmMessage = yield message.channel.send(new discord_js_1.MessageEmbed().setTitle('❗ Please Confirm').setDescription(`Are you sure you want to reset levels and xp from the user ${user}? You CAN'T undo this action.`).setColor('#846bd6'));
            confirmMessage.react('✅');
            confirmMessage.react('❎');
            confirmMessage.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
                .then((collected) => __awaiter(this, void 0, void 0, function* () {
                const reaction = collected.first();
                if (reaction.emoji.name === '✅') {
                    let data = yield level_schema_1.default.findOneAndDelete({ Guild: message.guild.id, User: user.id });
                    if (!data) {
                        message.channel.send(new discord_js_1.MessageEmbed().setTitle(emojis_json_1.error + `Error`).setDescription('That user doesn\'t have xp.').setColor('#ff2d2d'));
                        return;
                    }
                    confirmMessage.delete();
                    message.channel.send(new discord_js_1.MessageEmbed().setTitle('✅ Done!').setDescription(`${user}'s xp has been reset.`).setColor('#846bd6'));
                    return;
                }
                else if (reaction.emoji.name === '❎') {
                    message.channel.send(new discord_js_1.MessageEmbed().setTitle(`❎ Action Cancelled`).setDescription('You cancelled your action.').setColor('#846bd6'));
                    confirmMessage.delete();
                    return;
                }
            }))
                .catch(() => {
                message.channel.send(timeEmbed);
                return;
            });
        });
    }
});
exports.default = rankCommand;
