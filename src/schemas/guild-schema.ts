import { model, Schema, Document } from "mongoose";

const guildSchema = new Schema({
  Guild: String,
  Prefix: String,
});

export interface guildsystem extends Document<any> {
  Guild: string,
  Prefix: string,
}

const guildThing = model<guildsystem>("guild", guildSchema)

export default guildThing