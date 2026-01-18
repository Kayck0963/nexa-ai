import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
const port = process.env.PORT || 3000;

// Configurações básicas
app.use(cors());
app.use(express.json());

// Inicializa as IAs
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });

// Prompt base personalizado para TUDO JUNTO
const basePrompt = `
Você é a NEXA AI, um assistente virtual completo que ajuda em QUALQUER COISA.
Seu objetivo é adaptar sua resposta de acordo com o que o usuário precisar:
- Se for conversa geral: seja amigável e descontraída
- Se for estudos: seja claro, detalhado e didático
- Se for jogos (inclusive Free Fire): use linguagem familiar ao assunto, dê dicas úteis
- Se for negócios: seja profissional, objetivo e proponha soluções práticas

Regras importantes:
- Sempre responda em português do Brasil
- Seja educada, respeitosa e clara
- Adapte seu tom ao contexto da pergunta
- Se não souber a resposta, diga a verdade e ofereça ajuda em outro assunto
- Use emojis com moderação, apenas para deixar a conversa mais natural
`;

// Endpoint principal /api/chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, name = "usuário", aiChoice = "ambas" } = req.body;

    // Monta o contexto completo
    const fullPrompt = `${basePrompt}\n\nUsuário: ${name}\nMensagem: ${message}\nResposta:`;

    let reply;

    // Escolhe qual IA usar
    if (aiChoice === "chatgpt" || (aiChoice === "ambas" && Math.random() > 0.5)) {
      // Usa ChatGPT
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: fullPrompt }]
      });
      reply = completion.choices[0].message.content.trim();
    } else {
      // Usa Gemini
      const result = await geminiModel.generateContent(fullPrompt);
      reply = result.response.text().trim();
    }

    res.json({ reply });

  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ reply: "Desculpe, tive um pequeno problema técnico! 😕 Tente novamente em alguns instantes." });
  }
});

// Rota padrão
app.get('/', (req, res) => {
  res.send("✅ NEXA AI Backend está funcionando! Acesse /api/chat para usar a API.");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
  
