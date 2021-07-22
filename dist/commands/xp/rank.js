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
const rankCommand = new command_handler_1.default({
    name: 'rank',
    maxArgs: 1,
    minArgs: 0,
    expectedArgs: '[user]',
    allowedChannels: ['744288105300885554'],
    run: function (message) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = message.mentions.users.first() || message.member;
            let data = yield level_schema_1.default.findOne({ Guild: message.guild.id, User: user.id });
            if (!data) {
                new discord_js_1.MessageEmbed().setTitle(emojis_json_1.error + `Error`).setDescription('You are not ranked yet, send some messages first.').setColor('#ff2d2d');
                return;
            }
            message.channel.send(new discord_js_1.MessageEmbed().setTitle(`🏆 ${message.author.username}'s Rank`).addField('**XP: **', data.xp).addField('**Level: **', data.level).addField('**Next Level: **', data.toLevelUp - data.xp).setColor('#846bd6'));
        });
    }
});
exports.default = rankCommand;
