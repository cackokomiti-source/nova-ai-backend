const express = require("express");
const cors = require("cors");
const Anthropic = require("@anthropic-ai/sdk");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1000,
      system: "You are NOVA, a helpful AI assistant. Reply in the same language as the user.",
      messages,
    });
    res.json({ reply: response.content[0].text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/", (req, res) => res.send("NOVA AI Backend is running!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
