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
const gradient_string_1 = __importDefault(require("gradient-string"));
const n3x_1 = __importDefault(require("../../n3x"));
const event_handler_1 = __importDefault(require("../../handlers/event-handler"));
const readyEvent = new event_handler_1.default({
    name: 'ready',
    run: function () {
        return __awaiter(this, void 0, void 0, function* () {
            const randomStatus = function () {
                var _a;
                const statusArray = [['n!help', 0], ['Made by Amex', 0], ['Amex Lounge', 2]];
                let statusRandom = Math.floor(Math.random() * statusArray.length);
                (_a = n3x_1.default.user) === null || _a === void 0 ? void 0 : _a.setActivity(statusArray[statusRandom][0], { type: statusArray[statusRandom][1] });
            };
            setInterval(randomStatus, 30000);
            console.log(gradient_string_1.default('#aa00ff', '#00f2ff')([
                '                                                     ',
                '          ▄▄           ███████    ▄▄▄     ▄▄▄        ',
                '          ██▀▀▀▀▀█▄   ██     ██     ▀█▄ ▄█▀          ',
                '          ██     ██        ███        ███            ',
                '          ██     ██   ██     ██     ▄█▀ ▀█▄          ',
                '          ▀▀     ▀▀    ███████    ▀▀▀     ▀▀▀        ',
                '                                                     '
            ].join('\n')));
        });
    }
});
exports.default = readyEvent;
