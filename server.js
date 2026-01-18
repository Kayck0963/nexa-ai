import express from 'express';
import cors from 'cors';
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

// NEXA AI - FUNCIONA SEM CHAVES!
function nexaResponse(msg) {
  const respostas = {
    "oi": "Oi oi! 😄 Tudo bem? Sou a NEXA AI, é um prazer te conhecer!",
    "tudo bem": "Estou ótima, obrigada por perguntar! E você, como vai?",
    "qual seu nome": "Me chamo NEXA AI! 🤖 Fui criada para te ajudar no que precisar!",
    "ajuda": "Claro que sim! 🤝 Posso te ajudar com estudos, dicas de jogos, ideias de projetos ou só bater um papo!",
    "estudos": "Que legal que você está estudando! 📚 Qual matéria você precisa ajuda? Matemática, Português, História...?",
    "jogos": "Jogos são top! 💥 Você curte Free Fire, Minecraft, Roblox ou outro jogo?",
    "projetos": "Adoro projetos! 💡 Que tal começar com algo simples, como um site pessoal ou um app de lista de tarefas?",
    "oi nexa": "Oi oi! 😊 Que bom que você me chamou!"
  };
  const msgLower = msg.toLowerCase().trim();
  return respostas[msgLower] || `Eu entendi sua mensagem: "${msg}"! 😊 Ainda estou aprendendo muito, mas em breve vou saber responder a mais coisas! Se precisar de ajuda, pergunte "ajuda" que vou te dar algumas opções!`;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    res.json({ reply: nexaResponse(message) });
  } catch (e) {
    res.json({ reply: "Ops, mas eu estou funcionando! ✔️ Deu um pequeno erro, mas vamos conversar mesmo assim!" });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(port, () => console.log(`NEXA AI rodando na porta ${port}`));
