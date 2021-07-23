"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
//i don't need to explain this
const discord_js_1 = require("discord.js");
const config_json_1 = __importDefault(require("./config.json"));
const mongoose_1 = __importDefault(require("mongoose"));
const chalk_1 = __importDefault(require("chalk"));
const load_events_1 = __importDefault(require("../handlers/load-events"));
const load_commands_1 = __importDefault(require("../handlers/load-commands"));
const express_1 = __importDefault(require("express"));
//this is a class
class n3x extends discord_js_1.Client {
    constructor() {
        super(...arguments);
        //this is a token
        this.typeUrTokenHere = '';
        this.pathForMongo = '';
    }
    //this is a function
    start(token) {
        //this defines token
        this.typeUrTokenHere = token;
        //this makes the bot log in
        this.login(this.typeUrTokenHere);
    }
    //Please read the function name
    connectToMongo(mongoPath) {
        this.pathForMongo = mongoPath;
        try {
            mongoose_1.default.connect(this.pathForMongo, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => { console.log(chalk_1.default.greenBright('> ') + 'Conected to ' + chalk_1.default.greenBright('MongoDB')); });
        }
        catch (err) {
            console.log(err);
        }
    }
    loadEvents() {
        ['client', 'guild'].forEach(e => load_events_1.default(e));
    }
    loadCommands() {
        load_commands_1.default('.././commands');
    }
    keepAlive(port) {
        const app = express_1.default();
        app.get('/', (request, response) => response.send('Hello World!'));
        app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
    }
}
exports.default = n3x;
exports.client = new n3x();
exports.client.start(config_json_1.default.token);
exports.client.connectToMongo(config_json_1.default.mongoPath);
exports.client.loadEvents();
exports.client.loadCommands();
exports.client.keepAlive(5000);
