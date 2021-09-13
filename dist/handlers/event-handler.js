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
class Event {
    constructor({ name = '', run = function (...args) {
        return __awaiter(this, void 0, void 0, function* () { });
    } }) {
        this.eventName = '';
        this.eventName = name;
        this.execute = run;
    }
    run() {
        n3x_1.default.on(this.eventName, (...args) => {
            this.execute(...args);
        });
    }
    execute(...args) {
        // So, in teh event files u need to do this.execute = function() and then u write the code
    }
}
exports.default = Event;
