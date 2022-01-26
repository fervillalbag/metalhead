import PlanInfoModel from "../models/planInfo";

const getPlanInfo = async () => {
  try {
    const planInfo = await PlanInfoModel.findOne({});
    return planInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createPlanInfo = async (input: any) => {
  try {
    const planInfo = await new PlanInfoModel(input);
    await planInfo.save();

    return {
      message: "Creado correctamente",
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

const updatePlanInfo = async (input: any) => {
  try {
    await PlanInfoModel.findOneAndUpdate({ _id: input.id }, input);

    return {
      message: "Actualizado correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Hubo un problem al actualizar",
      success: null,
    };
  }
};

export default {
  getPlanInfo,
  createPlanInfo,
  updatePlanInfo,
};
