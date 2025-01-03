import {verifyToken} from "../utility/tokenUtility.js";
export default async (req, res, next) => {
  const token = req.headers["token"];

  if (!token) {
    return res.json({
      status: false,
      message: "Token not found",
    });
  }
  const decodedToken = verifyToken(token);
  console.log(decodedToken);
  if (!decodedToken) {
    return res.json({
      status: false,
      message: "Token verification failed",
    });
  }
  req.headers.email = decodedToken.email;
  req.headers.id = decodedToken.id;
  next();
};
