import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = async (req, res, next) => {
  try {
  const token = req.headers["authorization"];
  if (!token) return next(createError(401, "You are not authenticated!"));

  const decode = await jwt.verify(token, process.env.JWT);

  req.user = decode;
  next();
} catch (error) {
  res.status(401).json({ error : "Authentication Failed!"})
}
};