"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const discord_js_1 = require("discord.js");
const config_json_1 = __importDefault(require("./config.json"));
const mongoose_1 = __importDefault(require("mongoose"));
const chalk_1 = __importDefault(require("chalk"));
const load_events_1 = __importDefault(require("../handlers/load-events"));
const load_commands_1 = __importDefault(require("../handlers/load-commands"));
class n3x extends discord_js_1.Client {
    connectToMongo(mongoPath) {
        mongoose_1.default.connect(mongoPath, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
            .then(() => { console.log(chalk_1.default.greenBright('> ') + 'Conected to ' + chalk_1.default.greenBright('MongoDB')); })
            .catch((err) => console.log(err));
    }
    loadEvents() {
        ['client', 'guild'].forEach(e => (0, load_events_1.default)(e));
        console.log(chalk_1.default.blueBright('> ') + 'All ' + chalk_1.default.blueBright('events') + ' loaded.');
    }
    loadCommands() {
        (0, load_commands_1.default)('.././commands')
            .then(() => console.log(chalk_1.default.magentaBright('> ') + 'All ' + chalk_1.default.magentaBright('commands') + ' loaded.'));
    }
}
exports.default = n3x;
exports.client = new n3x({ intents: 32767 });
exports.client.login(config_json_1.default.token);
exports.client.connectToMongo(config_json_1.default.mongoPath);
exports.client.loadEvents();
exports.client.loadCommands();
