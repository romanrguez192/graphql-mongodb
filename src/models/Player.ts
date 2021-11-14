import { Schema, model } from "mongoose";

import Club from "./Club";

interface Player {
  name: string;
  age: number;
  position: string;
  clubId: string;
  country: string;
}

const playerSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 100,
  },
  age: {
    type: Number,
    required: true,
    min: 15,
    max: 99,
  },
  position: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 100,
  },
  clubId: {
    type: Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxLength: 100,
  },
});

playerSchema.pre("save", async function () {
  const club = await Club.findById(this.clubId);
  if (!club) {
    throw new Error("Club not found");
  }
});

const playerModel = model<Player>("Player", playerSchema);

export default playerModel;
