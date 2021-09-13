"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const levelSchema = new mongoose_1.Schema({
    User: String,
    Guild: String,
    xp: Number,
    level: Number,
    toLevelUp: Number
});
const levelThing = (0, mongoose_1.model)("level", levelSchema);
exports.default = levelThing;
