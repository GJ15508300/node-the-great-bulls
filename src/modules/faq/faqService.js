const faq = require("./faqSchema");

const createFaq = async (question, answer) => {
  const newFaq = new faq({ question, answer });
  await newFaq.save();
  return newFaq;
};

const getFaqs = async () => {
  return await faq.find();
};

module.exports = { createFaq, getFaqs };
