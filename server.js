import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente
dotenv.config();

// Configurações básicas
const app = express();
const port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'chave-secreta-nexa-2026';
const BCRYPT_SALT_ROUNDS = 10;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, 'frontend');

// Middlewares
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(frontendPath));

// ==============================
// BANCO DE DADOS EM MEMÓRIA
// ==============================
const usuarios = [];
const templatesIAs = [
  { id: "template-1", nome: "IA de Estudos", descricao: "Assistente para matérias escolares" },
  { id: "template-2", nome: "IA de Suporte", descricao: "Atendimento ao cliente" },
  { id: "template-3", nome: "IA de Marketing", descricao: "Planos e estratégias digitais" },
  { id: "template-4", nome: "IA de Redes Sociais", descricao: "Criação de conteúdo" }
];
const templatesSites = [
  { id: "site-1", nome: "Site de Agência", descricao: "Completo para marketing digital" },
  { id: "site-2", nome: "Landing Page", descricao: "Otimizada para vendas" }
];

// ==============================
// CRIA USUÁRIO ADMIN
// ==============================
const criarAdmin = async () => {
  const senhaCripto = await bcrypt.hash('senha-segura-123', BCRYPT_SALT_ROUNDS);
  usuarios.push({
    id: "admin-kayck-2026",
    nome: "Kayck (Admin)",
    email: "seu-email@exemplo.com",
    senha: senhaCripto,
    plano: "Admin Exclusivo"
  });
};
criarAdmin();

// ==============================
// ROTAS
// ==============================
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email);

  if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
    return res.json({ sucesso: false, msg: "E-mail ou senha errados!" });
  }

  const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({
    sucesso: true,
    token,
    usuario: { nome: usuario.nome, email: usuario.email, plano: usuario.plano }
  });
});

app.get('/api/templates/ias', (req, res) => {
  res.json({ sucesso: true, templates: templatesIAs });
});

app.get('/api/templates/sites', (req, res) => {
  res.json({ sucesso: true, templates: templatesSites });
});

// ==============================
// INICIA SERVIDOR
// ==============================
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
      
