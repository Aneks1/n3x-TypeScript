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
const uiCommand = new command_handler_1.default({
    name: 'user-info',
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: '[user]',
    allowedChannels: ['744288105300885554'],
    run: function (message) {
        return __awaiter(this, void 0, void 0, function* () {
            const { guild, channel } = message;
            const user = message.mentions.users.first() || message.member.user;
            const member = guild.members.cache.get(user.id);
            const embed = new discord_js_1.MessageEmbed()
                .setTitle(`${user.username}'s Information`)
                .setThumbnail(user.displayAvatarURL())
                .setColor('#846bd6')
                .addFields({
                name: 'User Name:',
                value: user.tag,
            }, {
                name: 'Nickname:',
                value: member.nickname || 'No nickname',
            }, {
                name: 'Joined server:',
                value: new Date(member.joinedTimestamp).toLocaleDateString(),
            }, {
                name: 'Joined Discord:',
                value: new Date(user.createdTimestamp).toLocaleDateString(),
            }, {
                name: 'Roles:',
                value: member.roles.cache.size - 1,
            });
            channel.send(embed);
        });
    }
});
exports.default = uiCommand;
