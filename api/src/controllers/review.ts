import ReviewModel from "../models/review";
import { ReviewHome } from "../types/review";

const getReviewHome = async () => {
  try {
    const review = await ReviewModel.find({});
    return review;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createReviewHome = async (input: ReviewHome) => {
  try {
    const review = await new ReviewModel(input);
    await review.save();

    return {
      message: "Creado correctamente.",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Hubo un problema al crear.",
      success: false,
    };
  }
};

const updateReviewHome = async (input: ReviewHome) => {
  try {
    await ReviewModel.findOneAndUpdate({ _id: input.id }, input);

    return {
      message: "Actualizado correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Hubo un problema al actualizar.",
      success: false,
    };
  }
};

const deleteReviewHome = async (id: string) => {
  try {
    await ReviewModel.findOneAndDelete({ _id: id });
    return {
      message: "Eliminado correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Hubo un problema al eliminar",
      success: false,
    };
  }
};

export default {
  updateReviewHome,
  getReviewHome,
  createReviewHome,
  deleteReviewHome,
};
