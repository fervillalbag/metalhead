import AboutModel from "../models/about";
import { AboutInfo } from "../types/about";

const getAboutPage = async () => {
  try {
    const aboutData = await AboutModel.findOne({});
    return aboutData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createAboutPage = async (input: AboutInfo) => {
  try {
    const aboutData = await new AboutModel(input);
    await aboutData.save();

    return {
      message: "Creado correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateAboutPage = async (input: AboutInfo) => {
  try {
    await AboutModel.findOneAndUpdate(input);
    return {
      message: "Actualizado correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Hubo un problema al actualizar",
      success: false,
    };
  }
};

export default {
  updateAboutPage,
  getAboutPage,
  createAboutPage,
};
