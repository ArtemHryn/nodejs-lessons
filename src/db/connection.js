const mongoose = require("mongoose");

const connectMongo = async () => {
  mongoose.set("strictQuery", false);
  return mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = {
  connectMongo,
};
