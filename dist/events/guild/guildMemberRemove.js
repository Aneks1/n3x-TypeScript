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
const memberRemoveEvent = new event_handler_1.default({
    name: 'guildMemberAdd',
    run: function (member) {
        return __awaiter(this, void 0, void 0, function* () {
            const byeEmbed = new discord_js_1.MessageEmbed()
                .setTitle('Bye...')
                .setDescription(`${member} has left the server. Hope you join again.`)
                .setColor('#846bd6')
                .setThumbnail(member.user.displayAvatarURL());
            const auditEmbed = new discord_js_1.MessageEmbed()
                .setTitle(':outbox_tray: Member Left')
                .setAuthor(member.user.tag, member.user.displayAvatarURL())
                .setDescription(`${member} has left ${member.guild}`)
                .setColor('#ff2d2d')
                .setThumbnail(member.user.displayAvatarURL())
                .setFooter('ID: ' + member.user.id);
            yield member.guild.channels.cache.get('743849979101315193').send(byeEmbed);
            yield member.guild.channels.cache.get('743878643352207463').send(auditEmbed);
        });
    }
});
exports.default = memberRemoveEvent;
