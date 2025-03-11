const faqService = require("./faqService");

const createFaq = async (req, res) => {
  try {
    const faq = await faqService.createFaq(req.body.question, req.body.answer);
    res.status(201).json({ message: "FAQ created successful", faq });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getFaq = async (req, res) => {
  try {
    const faq = await faqService.getFaqs();
    res.json(faq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createFaq, getFaq };
