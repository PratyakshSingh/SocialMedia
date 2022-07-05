const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "please login first",
      });
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
