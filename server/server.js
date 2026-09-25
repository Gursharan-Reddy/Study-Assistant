import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const chatCompletion = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that returns ONLY valid JSON matching this exact structure, no markdown formatting blocks, no prose: { "flashcards": [{"question": "string", "answer": "string"}], "quiz": [{"question": "string", "options": ["string"], "correctIndex": 0}] }'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' }
    });

    const rawText = chatCompletion.choices[0]?.message?.content;
    const data = JSON.parse(rawText);
    res.json(data);
  } catch (error) {
    console.error('DETAILED SERVER ERROR:', error);
    res.status(500).json({ error: error.message || 'Failed to generate response' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});