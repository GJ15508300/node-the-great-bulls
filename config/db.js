const mongooes = require("mongoose");

const connectDB = async () => {
  try {
    await mongooes.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected....");
  } catch (error) {
    console.error("DataBase Connection Failed : ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
