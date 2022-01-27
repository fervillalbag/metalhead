import { model, Schema } from "mongoose";

const planSchema = new Schema({
  slug: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model("Plan", planSchema);
