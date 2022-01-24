import ProductInfoModel from "../models/productInfo";

const createProductInfo = async (input: any) => {
  try {
    const productInfo = new ProductInfoModel(input);
    productInfo.save();

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

const getProductInfo = async () => {
  try {
    const productInfo = ProductInfoModel.findOne({});
    return productInfo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateProductInfo = async (input: any) => {
  try {
    await ProductInfoModel.findOneAndUpdate({ _id: input.id }, input);

    return {
      message: "Actualizado correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Hubo un problema al actualizar",
      success: null,
    };
  }
};

export default {
  createProductInfo,
  updateProductInfo,
  getProductInfo,
};
