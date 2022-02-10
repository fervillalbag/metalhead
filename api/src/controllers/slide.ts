import Slide from "../models/slide";

const getSlides = async () => {
  try {
    const slides = await Slide.find({});
    return slides;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getSlide = async (id: string) => {
  try {
    const slide = await Slide.findOne({ _id: id });
    return slide;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createSlide = async (input: any) => {
  try {
    const slide = new Slide({
      image: input.image,
      createdAt: new Date(),
    });
    await slide.save();

    return {
      message: "Slide creado correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Hubo un error al crear",
      success: false,
    };
  }
};

const deleteSlide = async (id: string) => {
  try {
    await Slide.findOneAndDelete({ _id: id });

    return {
      message: "Slide eliminado correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Hubo un error al eliminar el slide",
      success: false,
    };
  }
};

export default {
  createSlide,
  deleteSlide,
  getSlides,
  getSlide,
};
