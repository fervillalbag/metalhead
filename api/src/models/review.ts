import { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
  },
});

export default model("Review", ReviewSchema);
