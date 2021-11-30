import { model, Schema, Document } from "mongoose";

const warnSchema = new Schema({
    User: String,
    Guild: String,
    warns: Number
})

export interface warnsystem extends Document<any> {
    User: string,
    Guild: string,
    warns: number
}

const warnThing = model<warnsystem>("warn", warnSchema)

export default warnThing