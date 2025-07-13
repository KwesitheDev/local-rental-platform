const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.SECRET); c
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token invalid or expired" });
  }
};

module.exports = { requireAuth };
