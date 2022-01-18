import { Schema, model } from "mongoose";

const growthSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model("Growth", growthSchema);
