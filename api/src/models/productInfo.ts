import { model, Schema } from "mongoose";

const ProductInfoSchema = new Schema({
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

export default model("ProductInfo", ProductInfoSchema);
