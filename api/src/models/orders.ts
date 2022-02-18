import { model, Schema } from "mongoose";

const ListProductsSchema = new Schema({
  products: {
    type: Array,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  idUser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: String,
    required: true,
  },
});

export default model("ListProduct", ListProductsSchema);
