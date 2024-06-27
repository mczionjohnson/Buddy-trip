import jwt from "jsonwebtoken";
import logger from "../logger/logger.js";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET_TOKEN;

const checkAuth = (req, res, next) => {
  // logger.debug("Auth middleware");
  // get the Authorization header
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized1" });
  }
  // logger.debug("Authorization", authorization);

  const bearerToken = authorization.split(" ");
  if (bearerToken.length !== 2) {
    return res.status(401).json({ message: "Unauthorized2" });
  }
  // logger.debug("Token", bearerToken[1]);
  jwt.verify(bearerToken[1], secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Unauthorized3" });
    } else {
      // logger.debug("Decoded", decoded);
      req.user = decoded;
      next();
    }
  });
};

export default checkAuth;
