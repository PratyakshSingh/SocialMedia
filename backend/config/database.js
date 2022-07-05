const mongoose = require("mongoose");

exports.connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => console.log(`db connected ${con.connection.host}`));
};
