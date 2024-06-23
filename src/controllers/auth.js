import jwt from "jsonwebtoken";

import dotenv from "dotenv";

import logger from "../logger/logger.js";

import User from "../models/userSchema.js";

dotenv.config();
const secret = process.env.JWT_SECRET_TOKEN;

export const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === undefined ||
      email.trim().length < 1 ||
      password === undefined ||
      password.trim().length < 1
    ) {
      res.status(400).json({
        status: "error",
        message: "Please provide an Email and a Password",
      });
    } else {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const checkPassword = await user.isValidPassword(password);
      if (checkPassword == false) {
        return res.status(401).json({ message: "Password is incorrect" });
      } else {
        // console.log(user);
        const token = jwt.sign(
          {
            email: user.email,
            _id: user._id,
          },
          secret,
          { expiresIn: "1hr" }
        );
        // logger.info(token);
        return res.status(200).json({
          status: "success",
          message: "Login successful!",
          user,
          token,
        });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "error",
      message: "Internal server error occurred! Please try again later",
    });
  }
};

export const authRegister = async (req, res) => {
  try {
    // res.setHeader("Content-Type", "application/json");
    const { firstName, lastName, phoneNumber, email, password } = req.body;
    if (
      firstName === undefined ||
      firstName.trim().length < 1 ||
      lastName === undefined ||
      lastName.trim().length < 1 ||
      phoneNumber === undefined ||
      phoneNumber.trim().length < 1 ||
      email === undefined ||
      email.trim().length < 1 ||
      password === undefined ||
      password.trim().length < 1
    ) {
      res.status(400).json({
        status: "error",
        message: "All fields are required",
      });
    } else {
      const checkUser = await User.findOne({
        $or: [{ email: email }, { phoneNumber: phoneNumber }],
      });
      if (checkUser) {
        res.status(400);
        return res.json("User already exists");
      }

      const payload = {};

      payload.firstName = firstName;
      payload.lastName = lastName;
      payload.phoneNumber = phoneNumber;
      payload.email = email;
      payload.password = password;
      // console.log(payload);

      const user = new User({
        ...payload,
      });

      const savedUser = await user.save();

      res.status(201).json({
        status: "success",
        message: "Registration successful! You can now login.",
        savedUser,
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "error 1",
      message: "Internal server error occured! Please try again later",
    });
  }
};
