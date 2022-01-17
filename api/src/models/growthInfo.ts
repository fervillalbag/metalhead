import { Schema, model } from "mongoose";

const GrowthSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model("GrowthInfo", GrowthSchema);
