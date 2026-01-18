import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

// Configurações básicas
const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, 'frontend');

// Habilita funcionalidades essenciais
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(frontendPath));

// Conecta com as APIs das IAs
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Prompt base da NEXA AI
const basePrompt = `
Você é a NEXA AI, um assistente virtual amigável e completo.
Sempre responda em português do Brasil, de forma clara e objetiva.
Seja educado e ajude o usuário da melhor maneira possível!
`;

// Rota principal do chat (essa que estava faltando!)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, aiChoice = 'ambas' } = req.body;
    const fullPrompt = `${basePrompt}\n\nUsuário: ${message}\nResposta:`;

    let reply = '';

    // Escolha da IA
    if (aiChoice === 'chatgpt') {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: fullPrompt }]
      });
      reply = completion.choices[0].message.content.trim();
    } else if (aiChoice === 'gemini') {
      const result = await geminiModel.generateContent(fullPrompt);
      reply = result.response.text().trim();
    } else {
      // Tenta o ChatGPT primeiro, depois o Gemini
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: fullPrompt }]
        });
        reply = completion.choices[0].message.content.trim();
      } catch (e) {
        const result = await geminiModel.generateContent(fullPrompt);
        reply = result.response.text().trim();
      }
    }

    res.json({ reply });

  } catch (error) {
    console.error('Erro no chat:', error);
    res.json({ reply: `Desculpe, tive um problema! 🤔 Erro: ${error.message}` });
  }
});

// Rota para abrir a página inicial
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
