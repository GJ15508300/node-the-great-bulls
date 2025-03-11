const express = require("express");
const { createFaq, getFaq } = require("./faqController");

const router = express.Router();
router.post("/createFAQ", createFaq);
router.get("", getFaq);

module.exports = router;
