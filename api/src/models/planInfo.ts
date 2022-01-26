import { model, Schema } from "mongoose";

const PlanInfoModel = new Schema({
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

export default model("PlanInfo", PlanInfoModel);
