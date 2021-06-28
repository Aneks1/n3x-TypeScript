import { model, Schema, Document } from "mongoose";

const countSchema = new Schema({
  id: String,
  Guild: String,
  Current: Number,
});

export interface countsystem extends Document<any> {
  id: string;
  Guild: string;
  Current: number;
}

const countthing = model<countsystem>("counts", countSchema);

export default countthing;