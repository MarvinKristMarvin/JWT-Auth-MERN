import { UserModel } from "../models/user.js";

export const test = (req, res) => {
  res.json("controller working");
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if informations are correct or return errors
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "password should have at least 6 characters",
      });
    }
    // check if email already taken
    const exist = await UserModel.findOne({ email });
    if (exist) {
      return res.json({
        error: "email already used",
      });
    }
    // if all informations are good, create a user in db and return it
    const user = await UserModel.create({ name, email, password });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};
