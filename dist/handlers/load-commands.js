"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const n3x_1 = __importDefault(require("../n3x"));
const guild_schema_1 = __importDefault(require("../schemas/guild-schema"));
function loadCommands(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        let commandsArray = {};
        const files = fs_1.default.readdirSync(path_1.default.join(__dirname, dir));
        for (const file of files) {
            const commandFiles = fs_1.default.readdirSync(path_1.default.join(__dirname, dir, file));
            for (let commandFile of commandFiles) {
                commandFile = commandFile.split('.')[0];
                const command = (yield (Promise.resolve().then(() => __importStar(require(path_1.default.join(__dirname, dir, file, commandFile)))))).default;
                commandsArray[command.commandOptions.name] = command;
                console.log(command.commandOptions.name);
            }
        }
        n3x_1.default.on('messageCreate', (message) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (message.author.bot) {
                return;
            }
            const data = yield guild_schema_1.default.findOne({ Guild: (_a = message.guild) === null || _a === void 0 ? void 0 : _a.id });
            let prefix = data === null || data === void 0 ? void 0 : data.Prefix;
            if (!data || !prefix)
                prefix = 'n!';
            const args = message.content.split(/[ ]+/);
            const name = (_b = args.shift()) === null || _b === void 0 ? void 0 : _b.toLowerCase();
            if (!name.startsWith(prefix))
                return;
            const command = commandsArray[name.replace(prefix, '')];
            if (message.content.startsWith(prefix + command.commandOptions.name)) {
                command.run();
                return;
            }
        }));
    });
}
exports.default = loadCommands;
