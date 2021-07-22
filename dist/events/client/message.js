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
const event_handler_1 = __importDefault(require("../../handlers/event-handler"));
const count_schema_1 = __importDefault(require("../../schemas/count-schema"));
const level_schema_1 = __importDefault(require("../../schemas/level-schema"));
const guild_schema_1 = __importDefault(require("../../schemas/guild-schema"));
const messageEvent = new event_handler_1.default({
    name: 'message',
    run: function (message) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            //All this code is for counting.
            if (message.guild && message.channel.id == '843162306128511006') {
                let data = yield count_schema_1.default.findOne({ Guild: message.guild.id });
                if (!data && message.content == '1') {
                    data = new count_schema_1.default({ id: message.author.id, Guild: message.guild.id, Current: 1 });
                    data.save();
                }
                else if (data) {
                    const numCount = parseInt(message.content);
                    if (data == null)
                        return;
                    if (!Number.isNaN(numCount) && (data.Current + 1 == numCount && data.id != message.author.id)) {
                        data = yield count_schema_1.default.findOneAndUpdate({ id: message.author.id, Guild: message.guild.id, Current: numCount });
                        console.log('New current number ' + numCount);
                        if (data != null)
                            data.save();
                    }
                    else {
                        message.delete();
                    }
                }
                else {
                    message.delete();
                }
            }
            //And this is for leveling up
            if (message.channel.id == '743822809410830400', '769227400969191444', '810899508518060033', '744288105300885554') {
                if (message.author.bot) {
                    return;
                }
                const xp = Math.floor(Math.random() * (9 - 3) + 3);
                let data = yield level_schema_1.default.findOne({ Guild: (_a = message.guild) === null || _a === void 0 ? void 0 : _a.id, User: message.author.id });
                if (!data) {
                    data = new level_schema_1.default({ Guild: (_b = message.guild) === null || _b === void 0 ? void 0 : _b.id, User: message.author.id, xp: xp, level: 1, toLevelUp: 100 });
                    data.save();
                    return;
                }
                data.toLevelUp = (data.level + 1) * (100 / 2);
                data.xp = data.xp + xp;
                if (data.xp >= data.toLevelUp) {
                    data.level++;
                    data.xp = 0;
                    message.channel.send(new discord_js_1.MessageEmbed().setTitle(`⏫ ${message.author.username} Has Leveled Up`).setDescription(`You have leveled up to level ${data.level}`).setColor('#846bd6'));
                }
                data.save();
            }
            if (message.content == '<@!831905867687395401>') {
                let data = yield guild_schema_1.default.findOne({ Guild: (_c = message.guild) === null || _c === void 0 ? void 0 : _c.id });
                let prefix = (data === null || data === void 0 ? void 0 : data.Prefix) || '$';
                message.channel.send(new discord_js_1.MessageEmbed().setTitle(':gear: Hi, I\'m n3x').setDescription('My guild prefix is ' + prefix + '. Use `help` to view all my commands.').setColor('#846bd6'));
            }
        });
    }
});
exports.default = messageEvent;
