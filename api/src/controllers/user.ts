import UserModel from "../models/user";

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

const createUser = (input: any) => {
  const newUser = input;

  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();

  try {
    const user = new UserModel(newUser);
    user.save();

    return {
      message: "Ok",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Error",
      success: false,
    };
  }
};

export default {
  getUsers,
  getUser,
  createUser,
};
