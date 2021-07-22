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
const emojis_json_1 = require("../../assets/emojis.json");
const banCommand = new command_handler_1.default({
    name: 'ban',
    maxArgs: 1,
    minArgs: 1,
    expectedArgs: '<member>',
    permissions: ['BAN_MEMBERS'],
    run: function (message) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = (reaction, user) => { return ['✅', '❎'].includes(reaction.emoji.name) && user.id === message.author.id; };
            const member = message.mentions.members.first();
            if (member === null || member === void 0 ? void 0 : member.hasPermission('MANAGE_MESSAGES'))
                return message.channel.send(new discord_js_1.MessageEmbed().setTitle(emojis_json_1.error + ' Error').setDescription('I can\' ban a moderator / admin.').setColor('#ff2d2d'));
            if (!member)
                return message.channel.send(new discord_js_1.MessageEmbed().setTitle(emojis_json_1.error + ' Error').setDescription('I can\'t ban this user as they don\'t exist or they are not in the server').setColor('#ff2d2d'));
            const confirmMessage = yield message.channel.send(new discord_js_1.MessageEmbed().setTitle('❗ Please Confirm').setDescription(`Are you sure you want to ban the member${member}? You CAN'T undo this action.`).setColor('#846bd6'));
            confirmMessage.react('✅');
            confirmMessage.react('❎');
            confirmMessage.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
                .then((collected) => __awaiter(this, void 0, void 0, function* () {
                const reaction = collected.first();
                if (reaction.emoji.name === '✅') {
                    const auditChannel = message.guild.channels.cache.get('743878643352207463');
                    yield member.ban({ days: 7 });
                    message.channel.send(new discord_js_1.MessageEmbed().setTitle(emojis_json_1.ban + ' Member Banned').setDescription(`${member} has been banned.`).setColor('#846bd6'));
                    auditChannel.send(new discord_js_1.MessageEmbed().setTitle(emojis_json_1.ban + ' Member Banned').setDescription(`${member} has been banned.`).setColor('#ff2d2d').setThumbnail(member === null || member === void 0 ? void 0 : member.user.displayAvatarURL()).setFooter('ID: ' + (member === null || member === void 0 ? void 0 : member.user.id)).setAuthor(member === null || member === void 0 ? void 0 : member.user.tag, member === null || member === void 0 ? void 0 : member.user.displayAvatarURL()));
                    confirmMessage.delete();
                }
                else if (reaction.emoji.name === '❎') {
                    message.channel.send(new discord_js_1.MessageEmbed().setTitle(`❎ Action Cancelled`).setDescription('You cancelled your action.').setColor('#846bd6'));
                    confirmMessage.delete();
                    return;
                }
            }));
        });
    }
});
exports.default = banCommand;
