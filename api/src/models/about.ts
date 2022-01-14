import { Schema, model } from "mongoose";

const AboutSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Array,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default model("AboutPage", AboutSchema);
