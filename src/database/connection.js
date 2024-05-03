import mongoose from "mongoose";
import logger from "../logger/logger.js";


const connection = async () => {
    mongoose.connect(process.env.DEV_DATABASE)
  .then(() => {
    logger.info("Connected to MongoDb");
  })
  .catch((error) => {
    logger.error("Error: ", error);
  })
}


export default connection