// Elementos da tela
const telaLogin = document.getElementById('tela-login');
const painelAdmin = document.getElementById('painel-admin');
const formLogin = document.getElementById('form-login');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const menuLateral = document.querySelector('.menu-lateral');
const btnAbrirMenu = document.getElementById('abrir-menu');
const btnFecharMenu = document.getElementById('fechar-menu');

// Função de login
formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput.value;
    const senha = senhaInput.value;

    // Validação dos dados
    if (email === 'seu-email@exemplo.com' && senha === 'senha-segura-123') {
        // Esconde a tela de login e mostra o painel
        telaLogin.classList.add('oculta');
        painelAdmin.classList.remove('oculta');
        
        // Salva o status de login no navegador
        localStorage.setItem('nexa-logado', 'true');
    } else {
        alert('E-mail ou senha incorretos!');
    }
});

// Verifica se já está logado ao abrir a página
window.addEventListener('load', () => {
    const estaLogado = localStorage.getItem('nexa-logado') === 'true';
    
    if (estaLogado) {
        telaLogin.classList.add('oculta');
        painelAdmin.classList.remove('oculta');
    }
});

// Controle do menu lateral
btnAbrirMenu.addEventListener('click', () => {
    menuLateral.classList.add('aberto');
});

btnFecharMenu.addEventListener('click', () => {
    menuLateral.classList.remove('aberto');
});

// Fecha o menu ao clicar em um link
const linksMenu = document.querySelectorAll('.menu-lateral nav a');
linksMenu.forEach(link => {
    link.addEventListener('click', () => {
        menuLateral.classList.remove('aberto');
    });
});

// Função para voltar ao login (pode ser usada depois se precisar)
function fazerLogout() {
    localStorage.removeItem('nexa-logado');
    painelAdmin.classList.add('oculta');
    telaLogin.classList.remove('oculta');
    emailInput.value = 'seu-email@exemplo.com';
    senhaInput.value = 'senha-segura-123';
}
