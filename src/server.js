import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";


import connection from "./database/connection.js";

const app = express();
dotenv.config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

connection();


app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Not found",
  });
});

export default app
