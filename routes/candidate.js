const express = require("express");
const multer = require("multer");

const { extractText } = require("../services/parser");
const { analyzeCommerceResume } = require("../services/ai");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

let candidates = [];

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const text = await extractText(req.file);

    const ai = await analyzeCommerceResume(
      text,
      req.body.jobRole
    );

    const candidate = {
      id: Date.now(),
      name: ai.name,
      jobRole: req.body.jobRole,
      score: ai.score,
      recommendation: ai.recommendation,
      summary: ai.summary,
      skills: ai.skills
    };

    candidates.push(candidate);

    res.json({ success: true, candidate });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", (req, res) => {
  const sorted = [...candidates].sort((a, b) => b.score - a.score);
  res.json(sorted);
});

module.exports = router;
