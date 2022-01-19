import HeaderHomeModel from "../models/headerHome";
import { HeaderInfo } from "../types/header";

const getHeaderHome = async () => {
  try {
    const headerHomeData = await HeaderHomeModel.findOne({});
    return headerHomeData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createHeaderHome = async (input: HeaderInfo) => {
  try {
    const headerHomeData = new HeaderHomeModel(input);
    headerHomeData.save();
    return {
      message: "Creado correctamente",
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

const updateHeaderHome = async (input: HeaderInfo) => {
  try {
    await HeaderHomeModel.findOneAndUpdate(input);
    return {
      message: "Actualizado correctamente.",
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

export default {
  getHeaderHome,
  createHeaderHome,
  updateHeaderHome,
};
