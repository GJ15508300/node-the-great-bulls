const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authModule = require("./src/modules/auth/authModule");
const faqModule = require("./src/modules/faq/faqModule");
const cros = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cros());
app.use(express.json());

app.use("/api/auth", authModule);
app.use("/faq", faqModule);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
