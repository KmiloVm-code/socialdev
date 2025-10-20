import jwt from "jsonwebtoken";

//token verification middleware
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = data.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};