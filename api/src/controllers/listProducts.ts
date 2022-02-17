import ListProduct from "../models/listProducts";

const createListProducts = async (input: any) => {
  try {
    const listProduct = await new ListProduct(input);
    await listProduct.save();

    return {
      message: "Compra realizada correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Hubo un problema al realizar la compra",
      success: false,
    };
  }
};

const getListProducts = async (idUser: string) => {
  try {
    if (idUser) {
      const listProducts = await ListProduct.find({ idUser });
      return listProducts;
    }

    const listProducts = await ListProduct.find({});
    return listProducts;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  createListProducts,
  getListProducts,
};
