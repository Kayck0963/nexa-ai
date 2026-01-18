import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, 'frontend');

app.use(cors());
app.use(express.json());
app.use(express.static(frontendPath));

// Testa as chaves primeiro
console.log("Chave Gemini existe?", !!process.env.GEMINI_API_KEY);
console.log("Chave OpenAI existe?", !!process.env.OPENAI_API_KEY);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });

const basePrompt = `
Você é a NEXA AI, um assistente virtual completo que ajuda em QUALQUER COISA.
Sempre responda em português do Brasil.
`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, name = "usuário", aiChoice = "ambas" } = req.body;
    const fullPrompt = `${basePrompt}\n\nUsuário: ${name}\nMensagem: ${message}\nResposta:`;

    let reply;

    if (aiChoice === "chatgpt") {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: fullPrompt }]
        });
        reply = completion.choices[0].message.content.trim();
      } catch (e) {
        reply = `Erro no ChatGPT: ${e.message}`;
      }
    } else if (aiChoice === "gemini") {
      try {
        const result = await geminiModel.generateContent(fullPrompt);
        reply = result.response.text().trim();
      } catch (e) {
        reply = `Erro no Gemini: ${e.message}`;
      }
    } else {
      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: fullPrompt }]
        });
        reply = completion.choices[0].message.content.trim();
      } catch (e) {
        try {
          const result = await geminiModel.generateContent(fullPrompt);
          reply = result.response.text().trim();
        } catch (e2) {
          reply = `Erro em ambas: ChatGPT(${e.message}) | Gemini(${e2.message})`;
        }
      }
    }

    res.json({ reply });

  } catch (error) {
    console.error("Erro geral:", error);
    res.status(500).json({ reply: `Erro técnico: ${error.message}` });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
    
