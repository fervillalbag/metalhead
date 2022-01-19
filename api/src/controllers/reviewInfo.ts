import ReviewInfoModel from "../models/reviewInfo";
import { ReviewInfo } from "../types/review";

const getReviewInfoHome = async () => {
  try {
    const reviewInfo = await ReviewInfoModel.findOne();
    return reviewInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createReviewHomeInfo = async (input: ReviewInfo) => {
  try {
    const reviewInfo = new ReviewInfoModel(input);
    reviewInfo.save();

    return {
      message: "Creada correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Hubo un problema al crear",
      success: false,
    };
  }
};

const updateReviewHomeInfo = async (input: ReviewInfo) => {
  try {
    await ReviewInfoModel.findOneAndUpdate({ _id: input.id }, input);

    return {
      message: "Actualizada correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Hubo un error al actualizar",
      success: false,
    };
  }
};

export default {
  getReviewInfoHome,
  createReviewHomeInfo,
  updateReviewHomeInfo,
};
