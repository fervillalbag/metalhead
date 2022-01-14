import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
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

export default model("Product", ProductSchema);
