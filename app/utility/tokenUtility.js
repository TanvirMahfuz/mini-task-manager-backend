import jwt from "jsonwebtoken";
import {JWT_KEY, JWT_EXPIRE_TIME} from "../config/config.js";
export const createToken = (email, id) => {
  return jwt.sign({email, id}, JWT_KEY, {
    expiresIn: JWT_EXPIRE_TIME,
  });
};
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_KEY);
  } catch (error) {
    return {error: error.message};
  }
};
