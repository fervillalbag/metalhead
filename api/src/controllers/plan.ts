import PlanModel from "../models/plan";

const getPlans = async () => {
  try {
    const plans = await PlanModel.find({});
    return plans;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createPlan = async (input: any) => {
  try {
    const plan = new PlanModel(input);
    plan.save();

    return {
      message: "Plan creado correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Hubo un problema al crear el plan",
      success: false,
    };
  }
};

const updatePlan = async (input: any) => {
  try {
    await PlanModel.findOneAndUpdate(input);

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

const deletePlan = async (id: string) => {
  try {
    await PlanModel.findOneAndDelete({ _id: id });
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
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
};
