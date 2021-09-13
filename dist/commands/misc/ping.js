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
const pingCommand = new command_handler_1.default({
    name: 'ping',
    run: function (message) {
        return __awaiter(this, void 0, void 0, function* () {
            const pingEmbed = new discord_js_1.MessageEmbed()
                .setTitle('🏓 Pong!')
                .setColor('#846bd6');
            const msg = yield message.channel.send({ embeds: [pingEmbed] });
            const ping = msg.createdTimestamp - message.createdTimestamp;
            const pingEmbed2 = new discord_js_1.MessageEmbed()
                .setTitle('🏓 Pong!')
                .setDescription(`My ping is ${ping}ms.`)
                .setColor('#846bd6');
            msg.edit({ embeds: [pingEmbed2] });
        });
    }
});
exports.default = pingCommand;
