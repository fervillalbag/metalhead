import GrowthModel from "../models/growth";

const getGrowthHome = async () => {
  try {
    const growths = await GrowthModel.find();
    return growths;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateGrowthHome = async (input: any) => {
  try {
    await GrowthModel.findOneAndUpdate({ _id: input.id }, input);
    return {
      message: "Actualizada correctamente",
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

const createGrowthHome = async (input: any) => {
  try {
    const growth = new GrowthModel(input);
    growth.save();

    return {
      message: "Ha sido creada correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Ha ocurrido un problema al crear",
      success: false,
    };
  }
};

const deleteGrowthHome = async (id: string) => {
  try {
    await GrowthModel.findOneAndDelete({ _id: id });

    return {
      message: "Eliminada correctamente",
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
  getGrowthHome,
  createGrowthHome,
  updateGrowthHome,
  deleteGrowthHome,
};
