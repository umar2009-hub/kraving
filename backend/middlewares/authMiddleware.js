const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // IMPORTANT: must match login payload key
    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
