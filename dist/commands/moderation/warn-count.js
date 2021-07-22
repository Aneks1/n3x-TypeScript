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
const setprefixCommand = new command_handler_1.default({
    name: 'warn-count',
    minArgs: 0,
    maxArgs: 1,
    expectedArgs: '<member>',
    guildCommand: true,
    permissions: ['ADMINISTRATOR'],
    run: function (message) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const member = ((_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first()) || message.member;
            let data = yield warn_schema_1.default.findOne({ Guild: (_b = message.guild) === null || _b === void 0 ? void 0 : _b.id, User: member === null || member === void 0 ? void 0 : member.id });
            if (!data) {
                message.channel.send(new discord_js_1.MessageEmbed().setTitle(`📜 ${member === null || member === void 0 ? void 0 : member.user.username}'s Warns`).setDescription(`${member} has no warns`).setColor('#846bd6'));
                return;
            }
            message.channel.send(new discord_js_1.MessageEmbed().setTitle(`📜 ${member === null || member === void 0 ? void 0 : member.user.username}'s Warns`).setDescription(`${member} currently has ${data.warns} warns.`).setColor('#846bd6'));
        });
    }
});
exports.default = setprefixCommand;
