const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("please provide access token");

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    if (!verified) return res.status(400).json({ error: "token not valid" });
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: "token not valid" });
  }
};

module.exports = verifyToken;
