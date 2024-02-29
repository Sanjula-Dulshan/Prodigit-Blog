import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { getProfilePic } from "../utils/getProfilePic.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  try {
    const { fullName, username, email, password, confirmPassword, gender } =
      req.body;

    if (password !== confirmPassword) {
      next(errorHandler(400, "Password don't match"));
    }

    const user = await User.findOne({ username });
    const isEmailExist = await User.findOne({ email });

    if (user) {
      next(errorHandler(400, "username already exists"));
    }

    if (isEmailExist) {
      next(errorHandler(400, "Email already exists"));
    }

    const profilePicture = getProfilePic(gender, username);

    //Hash Password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashPassword,
      gender,
      profilePicture,
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const login = (req, res) => {
  res.send("Login route");
};
export const logout = (req, res) => {
  res.send("logout route");
};
