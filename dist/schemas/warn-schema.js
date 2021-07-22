"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const warnSchema = new mongoose_1.Schema({
    User: String,
    Guild: String,
    warns: Number
});
const warnThing = mongoose_1.model("warn", warnSchema);
exports.default = warnThing;
