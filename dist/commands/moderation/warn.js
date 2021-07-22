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
const warn_schema_1 = __importDefault(require("../../schemas/warn-schema"));
const emojis_json_1 = require("../../assets/emojis.json");
const setprefixCommand = new command_handler_1.default({
    name: 'warn',
    minArgs: 1,
    maxArgs: 800,
    expectedArgs: '<member> [reason]',
    guildCommand: true,
    permissions: ['ADMINISTRATOR'],
    run: function (message, args) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const roleIDs = ['810249115644592129', '810249207490412544', '810249235366674512', '810249273177276417', '810249288692400178', '810249304459182141'];
            const member = (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
            if (member === null || member === void 0 ? void 0 : member.hasPermission('MANAGE_MESSAGES')) {
                message.channel.send(new discord_js_1.MessageEmbed().setTitle(emojis_json_1.error + ' Error').setDescription('I can\' warn a moderator / admin.').setColor('#ff2d2d'));
                return;
            }
            if (!member) {
                message.channel.send(new discord_js_1.MessageEmbed().setTitle(emojis_json_1.error + ' Error').setDescription('I can\'t warn this user as they don\'t exist or they are not in the server').setColor('#ff2d2d'));
                return;
            }
            const channel = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.channels.cache.get('743878643352207463');
            let reason = args.slice(1).join(" ");
            if (!reason)
                reason = 'No sepecified';
            let data = yield warn_schema_1.default.findOne({ Guild: (_c = message.guild) === null || _c === void 0 ? void 0 : _c.id, User: member === null || member === void 0 ? void 0 : member.id });
            if (!data) {
                data = new warn_schema_1.default({ Guild: (_d = message.guild) === null || _d === void 0 ? void 0 : _d.id, User: member === null || member === void 0 ? void 0 : member.id, warns: 1 });
                data.save();
                message.channel.send(new discord_js_1.MessageEmbed().setTitle('⚠ Member Warned').setDescription(`${member} has been warned. (0 => 1)\nReason: ${reason}`).setColor('#846bd6'));
                member === null || member === void 0 ? void 0 : member.roles.add(roleIDs[0]);
                channel.send(new discord_js_1.MessageEmbed().setTitle('⚠ Member Warned').setDescription(`${member === null || member === void 0 ? void 0 : member.user.tag} has been warned (0 => 1)\nReason: ${reason}`).setColor('#ff2d2d').setThumbnail(member === null || member === void 0 ? void 0 : member.user.displayAvatarURL()).setFooter('ID: ' + (member === null || member === void 0 ? void 0 : member.user.id)).setAuthor(member === null || member === void 0 ? void 0 : member.user.tag, member === null || member === void 0 ? void 0 : member.user.displayAvatarURL()));
                return;
            }
            yield member.send(new discord_js_1.MessageEmbed().setTitle(`⚠ You have been Warned`).setDescription(`You have been warned in ${(_e = message.guild) === null || _e === void 0 ? void 0 : _e.name} (0 => 1)\nReason: ${reason}\nModerator: ${message.author.tag}`).setColor('#ff2d2d').setThumbnail(member === null || member === void 0 ? void 0 : member.user.displayAvatarURL()).setFooter('ID: ' + (member === null || member === void 0 ? void 0 : member.user.id)).setAuthor(member === null || member === void 0 ? void 0 : member.user.tag, member === null || member === void 0 ? void 0 : member.user.displayAvatarURL()));
            data.warns = data.warns + 1;
            data.save();
            member === null || member === void 0 ? void 0 : member.roles.add(roleIDs[data.warns - 1]);
            message.channel.send(new discord_js_1.MessageEmbed().setTitle('⚠ Member Warned').setDescription(`${member} has been warned. (${data.warns - 1} => ${data.warns})\nReason: ${reason}`).setColor('#846bd6'));
            channel.send(new discord_js_1.MessageEmbed().setTitle('⚠ Member Warned').setDescription(`${member === null || member === void 0 ? void 0 : member.user.tag} has been warned (${data.warns - 1} => ${data.warns})'\nReason: ${reason}\nModerator: ${message.author.tag}`).setColor('#ff2d2d').setThumbnail(member === null || member === void 0 ? void 0 : member.user.displayAvatarURL()).setFooter('ID: ' + (member === null || member === void 0 ? void 0 : member.user.id)).setAuthor(member === null || member === void 0 ? void 0 : member.user.tag, member === null || member === void 0 ? void 0 : member.user.displayAvatarURL()));
            yield member.send(new discord_js_1.MessageEmbed().setTitle(`⚠ You have been Warned`).setDescription(`You have been warned in ${(_f = message.guild) === null || _f === void 0 ? void 0 : _f.name} (${data.warns - 1} => ${data.warns})\nReason: ${reason}\nModerator: ${message.author.tag}`).setColor('#ff2d2d').setThumbnail(member === null || member === void 0 ? void 0 : member.user.displayAvatarURL()).setFooter('ID: ' + (member === null || member === void 0 ? void 0 : member.user.id)).setAuthor(member === null || member === void 0 ? void 0 : member.user.tag, member === null || member === void 0 ? void 0 : member.user.displayAvatarURL()));
        });
    }
});
exports.default = setprefixCommand;
