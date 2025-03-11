const mongooe = require("mongoose");

const FaqSchema = new mongooe.Schema({
  question: { type: String, require: true },
  answer: { type: String, require: true },
});

module.exports = mongooe.model("Faq", FaqSchema);
