const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Please login!" });
  } else {
    //console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    try {
      var decoded = await jwt.verify(token, process.env.PK);
      req.decoded = decoded;
      //console.log(decoded); // bar
      next();
    } catch (err) {
      res
        .status(401)
        .json({ message: "You are not authorized, please login first" });
    }
  }
};
