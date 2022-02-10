import { model, Schema } from "mongoose";

const SlideSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

export default model("Slide", SlideSchema);
