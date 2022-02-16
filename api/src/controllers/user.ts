import UserModel from "../models/user";
import { User } from "../types/user";

const getUsers = async () => {
  try {
    const users = await UserModel.find({});
    return users;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getUser = async (id: string) => {
  try {
    const user = await UserModel.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createUser = async (input: User) => {
  const newUser = input;

  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();

  const foundEmail = await UserModel.findOne({
    email: newUser.email,
  });
  if (foundEmail) {
    return {
      message: "El email ya está en uso",
      success: false,
    };
  }

  const foundUsername = await UserModel.findOne({
    username: newUser.username,
  });
  if (foundUsername) {
    return {
      message: "El username ya está en uso",
      success: false,
    };
  }

  try {
    const user = new UserModel(newUser);
    user.save();

    return {
      message: "Usuario creado correctamente",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Hubo un error al crear el usuario",
      success: false,
    };
  }
};

export default {
  getUsers,
  getUser,
  createUser,
};
