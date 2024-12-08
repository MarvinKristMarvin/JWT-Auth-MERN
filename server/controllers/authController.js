import { UserModel } from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";

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
    // if all informations are good, hash pw and create a user in db and return it
    const hashedPassword = await hashPassword(password);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }

    // check if the given password matches the hashed password
    const match = await comparePassword(password, user.password);
    if (match) {
      console.log("match");
      return res.json("Matching passwords");
    }
  } catch (error) {
    console.log(error);
  }
};
