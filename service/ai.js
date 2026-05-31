const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function analyzeCommerceResume(text, jobRole) {
  const prompt = `
You are a Commerce Department recruitment AI.

Evaluate this candidate for role: ${jobRole}

Focus on:
- Accounting skills
- Finance knowledge
- Business/Admin skills
- Tools like Excel, ERP, SAP
- Certifications (ICAN, ACCA, CFA)

Resume:
${text}

Return ONLY JSON:

{
  "name": "",
  "skills": [],
  "experienceYears": 0,
  "certifications": [],
  "score": 0,
  "recommendation": "",
  "summary": "",
  "riskFlags": []
}

Scoring:
0-40 Reject
41-65 Weak
66-80 Interview
81-100 Strong Hire
`;

  const res = await client.chat.completions.create({
    model: "gpt-5.5",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2
  });

  return JSON.parse(res.choices[0].message.content);
}

module.exports = { analyzeCommerceResume };
