import { model, Schema } from "mongoose";

const ListProductsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
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
  idUser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  qty: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model("ListProduct", ListProductsSchema);
