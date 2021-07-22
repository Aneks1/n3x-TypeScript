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
const event_handler_1 = __importDefault(require("../../handlers/event-handler"));
const guild_schema_1 = __importDefault(require("../../schemas/guild-schema"));
const readyEvent = new event_handler_1.default({
    name: 'guildCreate',
    run: function (guild) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield guild_schema_1.default.findOne({ Guild: guild.id });
            if (!data) {
                data = new guild_schema_1.default({ Guild: guild.id, Prefix: 'n!' });
                data.save();
            }
        });
    }
});
exports.default = readyEvent;
