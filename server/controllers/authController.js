import { UserModel } from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";

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
      // creates a jwt with user data to encode
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          // if successfull, send token to client in a cookie names token
          // and send user data back as a response
          return res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      return res.json({ error: "Passwords do not match" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    // checks authenticity of the token + callback to handle the result of verification
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      // sends decoded token payload
      res.json(user);
    });
  } else {
    res.json(null);
  }
};
