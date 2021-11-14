import { Schema, model } from "mongoose";

import Player from "./Player";

interface Club {
  name: string;
  founded: number;
  stadium: string;
  capacity: number;
  league: string;
  website?: string;
}

const clubSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  founded: {
    type: Number,
    required: true,
  },
  stadium: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  league: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
});

clubSchema.pre("remove", async function () {
  await Player.deleteMany({ clubId: this._id });
});

const clubModel = model<Club>("Club", clubSchema);

export default clubModel;
