import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  console.log("req.body", req.body);

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    //Check if email already exists
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User does not exist"));
    }

    const { password: pass, ...userWithoutPassword } = validUser._doc;

    //Check if password is correct
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Password is incorrect"));
    }

    //refresh token
    const refresh_token = createRefreshToken({
      id: validUser._id,
      isAdmin: validUser.isAdmin,
    });
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true, // prevent XSS attacks cross-site scripting attacks
      sameSite: "strict", // CSRF attacks cross-site request forgery attacks
      path: "/api/auth/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

//Create refresh token
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

//get access token
export const getAccessToken = (req, res) => {
  try {
    const rf_token = req.cookies.refresh_token;
    if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please login now!" });

      const access_token = createAccessToken({
        id: user.id,
        isAdmin: user.isAdmin,
      });
      res.json({ access_token });
    });
  } catch (error) {
    next(error);
  }
};

//Create access token
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const logout = (req, res) => {
  res.send("logout route");
};
