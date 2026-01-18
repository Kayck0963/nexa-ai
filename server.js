// ... [código anterior permanece igual até a seção de templates de IAs] ...

// ==============================
// TEMPLATES DE IAs (ATUALIZADOS COM MARKETING DIGITAL)
// ==============================
const templatesIAs = [
  // Templates anteriores
  {
    id: "template-1",
    nome: "IA de Estudos",
    descricao: "Assistente especializado em matérias escolares",
    promptBase: "Você é um assistente educacional especializado em matérias do ensino fundamental e médio..."
  },
  {
    id: "template-2",
    nome: "IA de Suporte ao Cliente",
    descricao: "Assistente para responder dúvidas de clientes",
    promptBase: "Você é um atendente de suporte ao cliente atencioso e eficiente..."
  },
  // Novos templates de Marketing Digital
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

// ==============================
// MÓDULO DE CRIAÇÃO DE SITES DE MARKETING DIGITAL
// ==============================
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
// USUÁRIO ADMINISTRADOR PERSONALIZADO (ATUALIZADO)
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
      permiteCriarSites: true, // Novo: Permite criar sites de marketing
      limiteIAsCriadas: null,
      limiteSitesCriados: null, // Ilimitado
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

// Chama a função para criar o usuário admin ao iniciar o servidor
criarUsuarioAdmin();

// ==============================
// ROTAS PARA CRIAÇÃO DE SITES DE MARKETING
// ==============================
app.get('/api/marketing/sites/templates', autenticarUsuario, (req, res) => {
  try {
    // Verifica permissão
    if (!req.usuario.planoAtivo.permiteCriarSites) {
      return res.json({ sucesso: false, mensagem: "Seu plano não permite criar sites de marketing!" });
    }

    res.json({
      sucesso: true,
      templates: templatesSitesMarketing
    });
  } catch (erro) {
    res.json({ sucesso: false, mensagem: `Erro ao carregar templates: ${erro.message}` });
  }
});

app.post('/api/marketing/sites/criar', autenticarUsuario, (req, res) => {
  try {
    const { templateId, nomeSite, nicho, corPrimaria, corSecundaria, logoUrl } = req.body;
    const usuario = req.usuario;

    if (!usuario.planoAtivo.permiteCriarSites) {
      return res.json({ sucesso: false, mensagem: "Seu plano não permite criar sites de marketing!" });
    }

    const template = templatesSitesMarketing.find(t => t.id === templateId);
    if (!template) {
      return res.json({ sucesso: false, mensagem: "Template não encontrado!" });
    }

    // Cria site personalizado
    const novoSite = {
      id: uuidv4(),
      usuarioId: usuario.id,
      nome: nomeSite,
      nicho,
      templateId,
      templateNome: template.nome,
      corPrimaria,
      corSecundaria,
      logoUrl,
      estrutura: template.estrutura,
      recursos: template.recursos,
      tecnologias: template.tecnologias,
      dataCriacao: moment().format('YYYY-MM-DD HH:mm:ss'),
      status: "em-construcao",
      codigoFonte: gerarCodigoFonteSite(template, nomeSite, nicho, corPrimaria, corSecundaria)
    };

    usuario.sitesCriados.push(novoSite.id);
    // Salva site em banco (pode ser expandido para armazenar no sistema de arquivos)

    res.json({
      sucesso: true,
      mensagem: "Site criado com sucesso!",
      site: novoSite,
      linkPreview: `/api/marketing/sites/preview/${novoSite.id}`
    });
  } catch (erro) {
    res.json({ sucesso: false, mensagem: `Erro ao criar site: ${erro.message}` });
  }
});

// Função para gerar código-fonte básico do site
const gerarCodigoFonteSite = (template, nomeSite, nicho, corPrimaria, corSecundaria) => {
  if (template.id === "site-template-1") {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${nomeSite} - Especialistas em Marketing Digital para ${nicho}</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
  <style>
    :root {
      --cor-primaria: ${corPrimaria || '#2563eb'};
      --cor-secundaria: ${corSecundaria || '#f97316'};
    }
    .banner-principal {
      background-color: var(--cor-primaria);
      color: white;
      padding: 80px 20px;
      text-align: center;
    }
    .diferenciais {
      padding: 60px 20px;
    }
  </style>
</head>
<body>
  <!-- Cabeçalho -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">${nomeSite}</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="#inicio">Início</a></li>
          <li class="nav-item"><a class="nav-link" href="#servicos">Serviços</a></li>
          <li class="nav-item"><a class="nav-link" href="#portfolio">Portfólio</a></li>
          <li class="nav-item"><a class="nav-link" href="#contato">Contato</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Banner Principal -->
  <section class="banner-principal" id="inicio">
    <div class="container">
      <h1>Transforme seu Negócio com Marketing Digital Eficiente</h1>
      <p class="mt-4">Especialistas em ${nicho} - Resultados comprovados no mercado brasileiro</p>
      <button class="btn btn-light btn-lg mt-5">Solicitar Orçamento</button>
    </div>
  </section>

  <!-- Diferenciais -->
  <section class="diferenciais">
    <div class="container">
      <h2 class="text-center mb-5">Nossos Diferenciais</h2>
      <div class="row">
        <div class="col-md-4 text-center">
          <h3>Planejamento Estratégico</h3>
          <p>Planos adaptados ao seu negócio e público-alvo</p>
        </div>
        <div class="col-md-4 text-center">
          <h3>Resultados Mensuráveis</h3>
          <p>Acompanhamento de métricas e relatórios detalhados</p>
        </div>
        <div class="col-md-4 text-center">
          <h3>Time Especializado</h3>
          <p>Profissionais capacitados e atualizados</p>
        </div>
      </div>
    </div>
  </section>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
    `;
  }
  // Códigos para outros templates seriam adicionados aqui
  return "Código-fonte gerado conforme template selecionado.";
};

app.get('/api/marketing/sites/preview/:siteId', autenticarUsuario, (req, res) => {
  try {
    const siteId = req.params.siteId;
    const usuario = req.usuario;

    // Busca site criado pelo usuário
    const site = usuarios
      .flatMap(u => u.sitesCriados.map(id => iasCriadas.find(s => s.id === id)))
      .find(s => s?.id === siteId && s?.usuarioId === usuario.id);

    if (!site) {
      return res.status(404).send("Site não encontrado!");
    }

    // Envia código-fonte como HTML
    res.send(site.codigoFonte);
  } catch (erro) {
    res.status(500).send(`Erro ao carregar preview: ${erro.message}`);
  }
});

// ==============================
// ROTAS ADICIONAIS (CONTINUAÇÃO DO CÓDIGO ANTERIOR)
// ==============================
// ... [resto do código permanece igual, incluindo rotas de IAs, pagamentos e chat] ...

// Inicia o servidor
app.listen(port, () => {
  console.log(`NEXA AI rodando na porta ${port} - Sistema completo de marketing digital ativado!`);
});
  
