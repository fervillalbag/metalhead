import UserModel from "../models/user";
import { User } from "../types/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (user: any, SECRET_KEY: any, expiresIn: any) => {
  const { id, name, username, email } = user;

  const payload = { id, name, username, email };
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

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

const createUser = async (input: any) => {
  const newUser = input;

  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();
  newUser.role = "user";

  const { password } = newUser;

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

  const salt = bcrypt.genSaltSync(10);
  newUser.password = await bcrypt.hash(password, salt);

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

const login = async (input: any) => {
  const { email, password } = input;

  const foundEmail = await UserModel.findOne({
    email,
  });
  if (!foundEmail) {
    return {
      message: "The email or password is not valid",
      success: false,
    };
  }

  const passwordSuccess = await bcrypt.compare(
    password,
    foundEmail.password
  );

  if (!passwordSuccess) {
    return {
      message: "The email or password is not valid",
      success: false,
    };
  }

  return {
    token: createToken(
      foundEmail,
      process.env.SECRET_KEY_LOGIN,
      "72h"
    ),
  };
};

export default {
  getUsers,
  getUser,
  createUser,
  login,
};
