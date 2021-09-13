"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const guildSchema = new mongoose_1.Schema({
    Guild: String,
    Prefix: String,
});
const guildThing = (0, mongoose_1.model)("guild", guildSchema);
exports.default = guildThing;
