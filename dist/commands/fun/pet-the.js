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
const petThe = require('pet-pet-gif'); // didn't work with import :/
const petCommand = new command_handler_1.default({
    name: 'pet-the',
    maxArgs: 1,
    minArgs: 0,
    expectedArgs: '[user]',
    allowedChannels: ['744288105300885554'],
    run: function (message) {
        return __awaiter(this, void 0, void 0, function* () {
            const member = message.mentions.members.first() || message.member;
            const avatar = member.user.displayAvatarURL({ format: 'png' });
            const animatedGif = yield petThe(avatar);
            const gifAttachment = new discord_js_1.MessageAttachment(animatedGif, `pet the ${member.user.username}.gif`);
            const msg = yield message.channel.send(gifAttachment);
            msg.attachments.forEach((attachment) => {
                const imageLink = attachment.proxyURL;
                msg.delete();
                const embed = new discord_js_1.MessageEmbed().setTitle(`Pet The ${member.user.username}`).setColor('#846bd6').setImage(imageLink);
                message.channel.send(embed);
            });
        });
    }
});
exports.default = petCommand;
