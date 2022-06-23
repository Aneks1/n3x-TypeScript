import { model, Schema, Document } from "mongoose";

const levelSchema = new Schema({
    User: String,
    Guild: String,
    xp: Number,
    level: Number,
    toLevelUp: Number
})

export interface levelsystem extends Document<any> {
    User: string,
    Guild: string,
    xp: number,
    level: number,
    toLevelUp: number
}

const levelThing = model<levelsystem>("level", levelSchema)

export default levelThing