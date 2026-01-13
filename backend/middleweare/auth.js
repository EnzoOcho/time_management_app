import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "No autenticado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: ... }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};