import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import connection from "./database/connection.js";

import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";

import userRouter from "./routes/users.js";
import rideRouter from "./routes/rides.js";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connection();

app.use("/v1", indexRouter);
app.use("/v1/a", authRouter);
app.use("/v1/u", userRouter);
app.use("/v1/r", rideRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Page not found",
  });
});

export default app;
