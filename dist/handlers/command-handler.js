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
const n3x_1 = __importDefault(require("../n3x"));
const chalk_1 = __importDefault(require("chalk"));
const discord_js_1 = require("discord.js");
const emojis_json_1 = require("../assets/emojis.json");
const guild_schema_1 = __importDefault(require("../schemas/guild-schema"));
class Command {
    constructor({ name = '', description = '', permissions = [''], disabled = false, guildCommand = true, requiredRoles = [''], allowedChannels = [''], expectedArgs = '', minArgs = 0, maxArgs = 0, run = function (...args) {
        return __awaiter(this, void 0, void 0, function* () { });
    } }) {
        this.commandOptions = { name: '', description: '', permissions: [''], disabled: false, guildCommand: true, requiredRoles: [''], allowedChannels: [''], expectedArgs: '', minArgs: 0, maxArgs: 0 };
        this.commandOptions.name = name;
        this.commandOptions.description = description;
        this.commandOptions.permissions = permissions;
        this.commandOptions.disabled = disabled;
        this.commandOptions.guildCommand = guildCommand;
        this.commandOptions.requiredRoles = requiredRoles;
        this.commandOptions.allowedChannels = allowedChannels;
        this.commandOptions.expectedArgs = expectedArgs;
        this.commandOptions.minArgs = minArgs;
        this.commandOptions.maxArgs = maxArgs;
        this.execute = run;
    }
    validatePermissions() {
        const validPermissions = ['CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'VIEW_GUILD_INSIGHTS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS'];
        for (const permission of this.commandOptions.permissions) {
            if (permission != '') {
                if (!validPermissions.includes(permission)) {
                    throw new Error(`Unknown permission "${permission}"`);
                }
            }
        }
        return;
    }
    validateRoles(message) {
        var _a;
        for (const role of this.commandOptions.requiredRoles) {
            if (role != '') {
                if (!((_a = message.guild) === null || _a === void 0 ? void 0 : _a.roles.cache.get(role))) {
                    throw new Error(`Unknown role id ${role}. (Please consider using the role id and check that it's a valid id)`);
                }
            }
        }
    }
    validateChannels(message) {
        var _a;
        for (const channel of this.commandOptions.allowedChannels) {
            if (channel != '') {
                if (!((_a = message.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.get(channel))) {
                    throw new Error(`Unknown guild channel id ${channel}. (Please consider using the channel id and check that it's a valid id)`);
                }
            }
        }
    }
    run() {
        console.log(chalk_1.default.magentaBright('> ') + 'Reading command ' + chalk_1.default.magentaBright(this.commandOptions.name));
        n3x_1.default.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            // Split on any number of spaces
            const args = message.content.split(/[ ]+/);
            const name = (_a = args.shift()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
            const data = yield guild_schema_1.default.findOne({ Guild: (_b = message.guild) === null || _b === void 0 ? void 0 : _b.id });
            let prefix = data === null || data === void 0 ? void 0 : data.Prefix;
            if (!data || !prefix)
                prefix = 'n!';
            if (name != prefix + this.commandOptions.name)
                return;
            this.validatePermissions();
            this.validateRoles(message);
            this.validateChannels(message);
            if (this.commandOptions.disabled == true)
                return;
            if (this.commandOptions.guildCommand == true && !message.guild) {
                message.channel.send(new discord_js_1.MessageEmbed().setTitle(emojis_json_1.error + ' Error').setDescription('You can only use this command in a guild.').setColor('#ff2d2d'));
                return;
            }
            if (this.commandOptions.guildCommand == false && message.guild) {
                message.channel.send(new discord_js_1.MessageEmbed().setTitle(emojis_json_1.error + ' Error').setDescription("You can't use this command in a guild, try to DM it instead.").setColor('#ff2d2d'));
                return;
            }
            // Ensures that the member has the required permissions to user this command
            for (const permission of this.commandOptions.permissions) {
                if (this.commandOptions.permissions[0] != '') {
                    if (!((_c = message.member) === null || _c === void 0 ? void 0 : _c.hasPermission(permission))) {
                        message.channel.send(new discord_js_1.MessageEmbed().setTitle(emojis_json_1.error + ' Error').setDescription("You don't have enough permissions to use this command.").setColor('#ff2d2d'));
                        return;
                    }
                }
            }
            for (const requiredRole of this.commandOptions.requiredRoles) {
                if (this.commandOptions.requiredRoles[0] != '') {
                    if (!((_d = message.member) === null || _d === void 0 ? void 0 : _d.roles.cache.get(requiredRole))) {
                        message.channel.send(new discord_js_1.MessageEmbed().setTitle(emojis_json_1.error + ' Error').setDescription("You don't have the required roles to use this command.").setColor('#ff2d2d'));
                        return;
                    }
                }
            }
            for (const allowedChannel of this.commandOptions.allowedChannels) {
                if (this.commandOptions.allowedChannels[0] != '') {
                    if (this.commandOptions.allowedChannels && message.channel.id != allowedChannel) {
                        message.channel.send(new discord_js_1.MessageEmbed().setTitle(emojis_json_1.error + ' Error').setDescription(`This is not an allowed channel to use this command, please go to <#${allowedChannel}>`).setColor('#ff2d2d'));
                        return;
                    }
                }
            }
            if (this.commandOptions.maxArgs != undefined) {
                if (args.length > this.commandOptions.maxArgs || args.length < this.commandOptions.minArgs) {
                    message.channel.send(new discord_js_1.MessageEmbed().setTitle(emojis_json_1.error + ' Error').setDescription(`Syntax error, please use ${name} ${this.commandOptions.expectedArgs}`).setColor('#ff2d2d'));
                    return;
                }
            }
            this.execute(message, args, n3x_1.default);
        }));
    }
    execute(...args) {
        // This changes in command files.
    }
}
exports.default = Command;
