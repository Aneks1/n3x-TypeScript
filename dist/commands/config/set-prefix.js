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
const guild_schema_1 = __importDefault(require("../../schemas/guild-schema"));
const setprefixCommand = new command_handler_1.default({
    name: 'set-prefix',
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '<prefix>',
    guildCommand: true,
    permissions: ['ADMINISTRATOR'],
    run: function (message, args) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield guild_schema_1.default.findOneAndUpdate({ Guild: (_a = message.guild) === null || _a === void 0 ? void 0 : _a.id, Prefix: args[0] });
            if (!data) {
                data = new guild_schema_1.default({ Guild: (_b = message.guild) === null || _b === void 0 ? void 0 : _b.id, Prefix: args[0] });
                data.save();
                message.channel.send(new discord_js_1.MessageEmbed().setTitle(':gear: Prefix Changed').setDescription('Server prefix was changed to ' + args[0]).setColor('#846bd6'));
                return;
            }
            if (data != null)
                data.save();
            message.channel.send(new discord_js_1.MessageEmbed().setTitle(':gear: Prefix Changed').setDescription(`Server prefix was changed to` + '`' + args[0] + '`.').setColor('#846bd6'));
        });
    }
});
exports.default = setprefixCommand;
