const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/generate-images', async (req, res) => {
  const { prompt, n, size } = req.body;
  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({ prompt, n, size, response_format: "b64_json" }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate AI images. Make sure your API key is valid.");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
