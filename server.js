import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import mercadopago from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Alterado para bcryptjs (mais compatível)
import pdf from 'html-pdf';
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
const pdfTemplatesPath = path.join(__dirname, 'templates', 'pdf');

// Configuração do Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST-6249183341386323-011804-5e0a27b0e5b300e0307b5f5e08612125-152460543'
});

// Middlewares
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(frontendPath));

// ==============================
// BANCO DE DADOS EM MEMÓRIA
// ==============================
const usuarios = [];
const pagamentos = [];
const historicoConversas = [];
const solicitacoesPDF = [];
const iasCriadas = [];
const templatesIAs = [
  {
    id: "template-1",
    nome: "IA de Estudos",
    descricao: "Assistente especializado em matérias escolares",
    promptBase: "Você é um assistente educacional especializado em matérias do ensino fundamental e médio. Sempre responda de forma clara, didática e com exemplos práticos. Use linguagem acessível e evite termos técnicos desnecessários."
  },
  {
    id: "template-2",
    nome: "IA de Suporte ao Cliente",
    descricao: "Assistente para responder dúvidas de clientes",
    promptBase: "Você é um atendente de suporte ao cliente atencioso e eficiente. Sempre cumprimente o usuário, entenda sua dúvida com clareza e ofereça soluções práticas. Se não souber a resposta, indique que passará para um atendente humano."
  },
  {
    id: "template-5",
    nome: "IA de Estratégias de Marketing",
    descricao: "Cria planos e estratégias completas de marketing digital",
    promptBase: "Você é um consultor de marketing digital experiente. Sempre crie planos adaptados ao nicho do cliente, incluindo análise de público-alvo, objetivos SMART, canais de divulgação, cronograma e métricas de acompanhamento. Use dados relevantes do mercado brasileiro."
  },
  {
    id: "template-6",
    nome: "IA de Redes Sociais",
    descricao: "Cria conteúdos e planeja calendários para redes sociais",
    promptBase: "Você é um gestor de redes sociais especializado. Crie posts, legendas, hashtags e calendários de conteúdo adaptados para cada plataforma (Instagram, Facebook, TikTok, LinkedIn). Inclua dicas de engajamento e formato de publicações."
  },
  {
    id: "template-7",
    nome: "IA de Copywriting",
    descricao: "Escreve textos persuasivos para marketing",
    promptBase: "Você é um copywriter experiente. Crie textos para landing pages, e-mails, anúncios pagos e materiais promocionais. Use técnicas de copywriting para gerar conversões, adaptando o tom ao público-alvo e objetivo da campanha."
  },
  {
    id: "template-8",
    nome: "IA de SEO",
    descricao: "Auxilia na otimização de sites para mecanismos de busca",
    promptBase: "Você é um especialista em SEO brasileiro. Analise palavras-chave, sugira otimizações on-page e off-page, crie descrições meta, títulos e estrutura de URLs. Inclua dicas de velocidade do site e indexação no Google."
  }
];

const templatesSitesMarketing = [
  {
    id: "site-template-1",
    nome: "Site de Empresa de Marketing Digital",
    descricao: "Site completo para agências ou consultorias de marketing",
    estrutura: [
      "Página inicial (banner principal, diferenciais, serviços em destaque)",
      "Página de serviços (descrição detalhada de cada serviço oferecido)",
      "Página de casos de sucesso (portfólio com resultados alcançados)",
      "Página de depoimentos (avaliações de clientes)",
      "Página sobre nós (história da empresa, time)",
      "Página de contato (formulário, WhatsApp, endereço)",
      "Blog (conteúdo educativo sobre marketing)"
    ],
    recursos: [
      "Formulário de orçamento integrado",
      "Integração com redes sociais",
      "Botão de WhatsApp fixo",
      "Otimização para celulares",
      "Seções responsivas",
      "Galeria de trabalhos",
      "Newsletter para captação de leads"
    ],
    tecnologias: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "PHP (para formulários)"]
  },
  {
    id: "site-template-2",
    nome: "Site de Landing Page para Vendas",
    descricao: "Landing page otimizada para conversões",
    estrutura: [
      "Cabeçalho com logo e botão de chamada para ação",
      "Banner principal com oferta e benefícios",
      "Seção de recursos/produtos",
      "Depoimentos e provas sociais",
      "Dúvidas frequentes (FAQ)",
      "Seção de garantia",
      "Formulário de captura ou botão de compra",
      "Rodapé com informações legais"
    ],
    recursos: [
      "Contador regressivo para urgência",
      "Botão de compra fixo",
      "Integração com gateways de pagamento",
      "Otimização para SEO local",
      "Pixel de rastreamento (Facebook/Google)",
      "Responsividade total"
    ],
    tecnologias: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Integrado com Hotmart/Kiwify"]
  },
  {
    id: "site-template-3",
    nome: "Site de Blog de Marketing Digital",
    descricao: "Site focado em conteúdo educativo e captação de leads",
    estrutura: [
      "Página inicial (últimos posts, categorias em destaque)",
      "Página de categorias (organização por temas)",
      "Página de post individual (com compartilhamento)",
      "Página de autores (perfil dos escritores)",
      "Página de recursos (guia, e-books gratuitos)",
      "Página de contato"
    ],
    recursos: [
      "Formulário de captura de leads",
      "Sistema de comentários",
      "Navegação por tags e categorias",
      "Pesquisa interna",
      "Integração com ferramentas de e-mail marketing",
      "Otimização para SEO"
    ],
    tecnologias: ["WordPress", "Tema customizado", "Elementor", "Plugin Yoast SEO"]
  }
];

// ==============================
// CRIA USUÁRIO ADMIN
// ==============================
const criarUsuarioAdmin = async () => {
  const senhaCriptografada = await bcrypt.hash('senha-segura-123', BCRYPT_SALT_ROUNDS);
  usuarios.push({
    id: "admin-kayck-2026",
    nome: "Kayck (Admin)",
    email: "seu-email@exemplo.com",
    senha: senhaCriptografada,
    planoAtivo: {
      id: "admin-exclusivo",
      nome: "Plano Administrador Exclusivo",
      preco: 0.00,
      recursos: [
        "Tudo dos planos anteriores + recursos exclusivos",
        "Criação ilimitada de IAs próprias",
        "Limite de 200 perguntas por IA criada",
        "Exportação de IAs em JSON/CSV",
        "Compartilhamento de IAs com outros usuários",
        "Acesso a templates exclusivos de marketing",
        "Criação ilimitada de sites de marketing digital",
        "Exportação de código-fonte dos sites",
        "Personalização completa de templates",
        "Gerenciamento de usuários e planos"
      ],
      duracao: "Vitalício",
      limitePerguntasDiario: 200,
      tamanhoMaxResposta: null,
      permitePDF: true,
      suportePrioritario: true,
      permiteCriarIAs: true,
      permiteCriarSites: true,
      limiteIAsCriadas: null,
      limiteSitesCriados: null,
      limitePerguntasPorIA: 200
    },
    planoValidade: "vitalicio",
    dataCadastro: moment().format('YYYY-MM-DD HH:mm:ss'),
    ultimoAcesso: null,
    perguntasHoje: 0,
    tema: "padrao",
    iasCriadas: [],
    sitesCriados: []
  });
};

criarUsuarioAdmin();

// ==============================
// MIDDLEWARE DE AUTENTICAÇÃO
// ==============================
const autenticarUsuario = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ sucesso: false, mensagem: "Token não fornecido!" });

  try {
    const usuarioDecodificado = jwt.verify(token, JWT_SECRET);
    req.usuario = usuarios.find(u => u.id === usuarioDecodificado.id);
    if (!req.usuario) return res.status(401).json({ sucesso: false, mensagem: "Usuário não encontrado!" });
    
    if (req.usuario.planoAtivo.id !== 'gratuito' && moment(req.usuario.planoValidade).isBefore(moment())) {
      req.usuario.planoAtivo = {
        id: "basico",
        nome: "Plano Básico",
        preco: 19.90,
        moeda: "BRL",
        recursos: [
          "Acesso ao chat completo",
          "20 perguntas por dia",
          "Respostas detalhadas (até 500 caracteres)",
          "Suporte por e-mail (resposta em até 24h)",
          "Histórico de conversas (últimos 7 dias)",
          "Exportação de histórico em TXT"
        ],
        duracao: "30 dias",
        limitePerguntasDiario: 20,
        tamanhoMaxResposta: 500,
        permitePDF: false,
        suportePrioritario: false
      };
      req.usuario.planoValidade = null;
    }

    next();
  } catch (erro) {
    return res.status(401).json({ sucesso: false, mensagem: "Token inválido ou expirado!" });
  }
};

// ==============================
// ROTAS DE USUÁRIO
// ==============================
app.post('/api/cadastro', async (req, res) => {
  try {
    const { nome, email, senha, aceitaTermos } = req.body;

    if (!nome || !email || !senha || !aceitaTermos) {
      return res.json({ sucesso: false, mensagem: "Preencha todos os campos e aceite os termos!" });
    }

    if (usuarios.some(u => u.email === email)) {
      return res.json({ sucesso: false, mensagem: "E-mail já cadastrado!" });
    }

    if (senha.length < 6) {
      return res.json({ sucesso: false, mensagem: "Senha deve ter pelo menos 6 caracteres!" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, BCRYPT_SALT_ROUNDS);

    const novoUsuario = {
      id: uuidv4(),
      nome,
      email,
      senha: senhaCriptografada,
      planoAtivo: {
        id: "basico",
        nome: "Plano Básico",
        preco: 19.90,
        moeda: "BRL",
        recursos: [
          "Acesso ao chat completo",
          "20 perguntas por dia",
          "Respostas detalhadas (até 500 caracteres)",
          "Suporte por e-mail (resposta em até 24h)",
          "Histórico de conversas (últimos 7 dias)",
          "Exportação de histórico em TXT"
        ],
        duracao: "30 dias",
        limitePerguntasDiario: 20,
        tamanhoMaxResposta: 500,
        permitePDF: false,
        suportePrioritario: false
      },
      planoValidade: moment().add(7, 'days').format('YYYY-MM-DD HH:mm:ss'),
      dataCadastro: moment().format('YYYY-MM-DD HH:mm:ss'),
      ultimoAcesso: null,
      perguntasHoje: 0,
      tema: "padrao",
      iasCriadas: [],
      sitesCriados: []
    };

    usuarios.push(novoUsuario);

    const token = jwt.sign({ id: novoUsuario.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      sucesso: true,
      mensagem: "Cadastro realizado com sucesso!",
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        planoAtivo: novoUsuario.planoAtivo,
        planoValidade: novoUsuario.planoValidade
      },
      token
    });
  } catch (erro) {
    res.json({ sucesso: false, mensagem: `Erro no cadastro: ${erro.message}` });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = usuarios.find(u => u.email === email);
    if (!usuario) {
      return res.json({ sucesso: false, mensagem: "E-mail ou senha incorretos!" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.json({ sucesso: false, mensagem: "E-mail ou senha incorretos!" });
    }

    usuario.ultimoAcesso = moment().format('YYYY-MM-DD HH:mm:ss');
    usuario.perguntasHoje = 0;

    const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      sucesso: true,
      mensagem: "Login realizado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        planoAtivo: usuario.planoAtivo,
        planoValidade: usuario.planoValidade,
        tema: usuario.tema
      },
      token
    });
  } catch (erro) {
    res.json({ sucesso: false, mensagem: `Erro no login: ${erro.message}` });
  }
});

app.get('/api/usuario/perfil', autenticarUsuario, (req, res) => {
  res.json({
    sucesso: true,
    usuario: {
      id: req.usuario.id,
      nome: req.usuario.nome,
      email: req.usuario.email,
      planoAtivo: req.usuario.planoAtivo,
      planoValidade: req.usuario.planoValidade,
      dataCadastro: req.us
        
