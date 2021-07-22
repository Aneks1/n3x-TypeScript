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
const path_1 = __importDefault(require("path"));
const canvas_1 = __importDefault(require("canvas"));
const jimp_1 = __importDefault(require("jimp"));
const emojis_json_1 = require("../../assets/emojis.json");
const memberAddEvent = new event_handler_1.default({
    name: 'guildMemberAdd',
    run: function (member) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEmbed = new discord_js_1.MessageEmbed()
                .setTitle(emojis_json_1.wolf + ` Wecome to ${member.guild.name}!`)
                .setColor('#846bd6')
                .setDescription('Hi! Welcome to our server. We hope you enjoy the server.\nBefore you start talking, read <#743839307051303016> and <#804712368436281385>.\nAlse remember verify yourself in <#743854825057550458> so you can talk with other users.\nAnd remember having fun, thats the most important thing!\n  **-  Sincerely:** Staff members');
            const welcomeEmbed = new discord_js_1.MessageEmbed()
                .setTitle(emojis_json_1.party + ' Hey Hi!')
                .setDescription(`Hi ${member}! Welcome to ${member.guild.name}!\nWe hope you enjoy the server.\n  **-  Sincerely:** Staff members`)
                .setColor('#846bd6')
                .setThumbnail(member.user.displayAvatarURL());
            const auditEmbed = new discord_js_1.MessageEmbed()
                .setTitle(':inbox_tray: New Member')
                .setAuthor(member.user.tag, member.user.displayAvatarURL())
                .setDescription(`${member} has joined ${member.guild}`)
                .setColor('#00db42')
                .setThumbnail(member.user.displayAvatarURL())
                .setFooter('ID: ' + member.user.id);
            const channel = member.guild.channels.cache.get('743849979101315193');
            const auditChannel = member.guild.channels.cache.get('743878643352207463');
            const roleId = member.guild.roles.cache.get('743833437043032103');
            if (!channel || !channel.guild)
                return;
            channel.send(welcomeEmbed);
            auditChannel.send(auditEmbed);
            member.roles.add(roleId);
            yield member.send(userEmbed).catch(err => console.log(err));
            jimp_1.default.read(member.user.displayAvatarURL({ format: 'png' })).then(pfp => { return pfp.resize(150, 150).write(path_1.default.join(__dirname, '../../assets/user-pfp.png')); });
            setTimeout(function () {
                return __awaiter(this, void 0, void 0, function* () {
                    const canvas = canvas_1.default.createCanvas(700, 350);
                    const ctx = canvas.getContext('2d');
                    const background = yield canvas_1.default.loadImage(path_1.default.join(__dirname, '../../assets/WelcomeCanvasBackground.jpg'));
                    ctx.drawImage(background, 0, 0);
                    const pfp = yield canvas_1.default.loadImage(path_1.default.join(__dirname, '../../assets/user-pfp.png'));
                    ctx.drawImage(pfp, canvas.width / 2 - pfp.width / 2, canvas.height / 8);
                    ctx.fillStyle = '#ffffff';
                    ctx.font = '30px pusab';
                    let text = `${member.user.username} has joined the server`;
                    ctx.fillText(text, canvas.width / 2 - ctx.measureText(text).width / 2, canvas.height / 2 + canvas.height / 4);
                    ctx.font = '25px pusab';
                    text = `Member number ${member.guild.memberCount}`;
                    ctx.fillText(text, canvas.width / 2 - ctx.measureText(text).width / 2, canvas.height / 2 + canvas.height / 3);
                    const attachment = new discord_js_1.MessageAttachment(canvas.toBuffer());
                    channel.send('', attachment);
                });
            }, 2000);
        });
    }
});
exports.default = memberAddEvent;
