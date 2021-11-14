import mongoose from "mongoose";

const connect = () => mongoose.connect("mongodb://localhost/football");

export { connect };
