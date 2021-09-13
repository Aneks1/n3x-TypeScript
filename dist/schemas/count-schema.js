"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const countSchema = new mongoose_1.Schema({
    id: String,
    Guild: String,
    Current: Number,
});
const countThing = (0, mongoose_1.model)("counts", countSchema);
exports.default = countThing;
