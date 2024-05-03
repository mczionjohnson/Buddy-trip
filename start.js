import app from "./src/server.js";
import dotenv from 'dotenv';
import logger from "./src/logger/logger.js";




dotenv.config();

app.listen(process.env.PORT, () => {
  logger.info("server is running");
});
