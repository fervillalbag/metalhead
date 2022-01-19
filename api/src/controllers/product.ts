import ProductModel from "../models/product";
import { Products } from "../types/products";

const getProducts = async () => {
  try {
    const products = await ProductModel.find({});
    return products;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getProduct = async (id: string) => {
  try {
    const product = await ProductModel.findById(id);
    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createProduct = async (input: Products) => {
  try {
    const product = await new ProductModel(input);
    await product.save();

    return {
      message: "Producto creado correctamente",
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

const updateProduct = async (input: Products) => {
  try {
    await ProductModel.findOneAndUpdate({ _id: input.id }, input);

    return {
      message: "Actualizado correctamente",
      success: true,
    };
  } catch (error) {
    return {
      message: "Hubo un problema al actualizar",
      success: false,
    };
  }
};

const deleteProduct = async (id: string) => {
  try {
    await ProductModel.findOneAndDelete({ _id: id });

    return {
      message: "Eliminado correctamente",
      success: true,
    };
  } catch (error) {
    return {
      message: "Hubo un problema al eliminar",
      success: false,
    };
  }
};

export default {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
