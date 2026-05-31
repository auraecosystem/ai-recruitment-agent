const pdf = require("pdf-parse");
const mammoth = require("mammoth");

async function extractText(file) {
  const name = file.originalname.toLowerCase();

  if (name.endsWith(".pdf")) {
    const data = await pdf(file.buffer);
    return data.text;
  }

  if (name.endsWith(".docx")) {
    const data = await mammoth.extractRawText({
      buffer: file.buffer
    });
    return data.value;
  }

  throw new Error("Unsupported file type");
}

module.exports = { extractText };
