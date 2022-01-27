import PlanModel from "../models/plan";
import { Plan } from "../types/plan";

const getPlan = async (id: string, slug: string) => {
  try {
    let plan;
    if (id) plan = await PlanModel.findOne({ _id: id });
    if (slug) plan = await PlanModel.findOne({ slug });
    return plan;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getPlans = async () => {
  try {
    const plans = await PlanModel.find({});
    return plans;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createPlan = async (input: Plan) => {
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

const updatePlan = async (input: Plan) => {
  try {
    await PlanModel.findOneAndUpdate({ _id: input.id }, input);

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
  getPlan,
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
};
