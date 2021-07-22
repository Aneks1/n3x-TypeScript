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
const n3x_1 = __importDefault(require("../../n3x"));
const suggestCommand = new command_handler_1.default({
    name: 'suggest',
    guildCommand: false,
    run: function (message) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = (m) => m.author.id == message.author.id;
            const channelId = '752672860094464091';
            const channel = n3x_1.default.channels.cache.get(channelId);
            const suggestionEmbed = new discord_js_1.MessageEmbed()
                .setTitle('📨 New Suggestion')
                .setFooter(`Suggested by ${message.author.tag}`)
                .setThumbnail(message.author.displayAvatarURL())
                .setColor('#846bd6');
            const sendEmbed = new discord_js_1.MessageEmbed()
                .setTitle('⏩ Suggestion')
                .setColor('#846bd6')
                .setDescription('Please send your suggestion.');
            const timeEmbed = new discord_js_1.MessageEmbed()
                .setTitle('⏱ Time Out')
                .setColor('#ff2d2d')
                .setDescription('You ran out of time, please run the command again.');
            try {
                message.channel.send(sendEmbed);
                let msg = yield message.channel.awaitMessages(filter, { max: 1, time: 120000, errors: ['time'] });
                suggestionEmbed.setDescription(msg.first().content);
            }
            catch (_a) {
                message.channel.send(timeEmbed);
                return;
            }
            yield (channel === null || channel === void 0 ? void 0 : channel.send(suggestionEmbed).then((sentMessage) => sentMessage.react('✅')).then((reaction) => reaction.message.react('❎')));
            const successEmbed = new discord_js_1.MessageEmbed()
                .setTitle('✅ Suggestion Sent')
                .setDescription('Your suggestion has been submited.')
                .setColor('#846bd6');
            message.channel.send(successEmbed);
        });
    }
});
exports.default = suggestCommand;
