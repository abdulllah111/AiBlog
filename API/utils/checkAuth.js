import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  try {
    const decoded = jwt.verify(token, "abdul.arabp");
    req.userId = decoded._id;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token " + token });
  }
};
