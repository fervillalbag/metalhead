import GrowthModel from "../models/growth";

const getGrowthHome = async () => {
  try {
    const growthData = await GrowthModel.findOne({});
    return growthData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createGrowthHome = async (input: any) => {
  try {
    const growth = new GrowthModel(input);
    await growth.save();

    return {
      message: "Creado correctamente",
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

const updateGrowthHome = async (input: any) => {
  try {
    await GrowthModel.findOneAndUpdate(input);
    return {
      message: "Actualizado correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Hubo un problema al crear",
      success: null,
    };
  }
};

export default {
  getGrowthHome,
  createGrowthHome,
  updateGrowthHome,
};
