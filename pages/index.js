import { useState } from 'react';
import { FiLogIn, FiMenu, FiX, FiBot, FiGlobe, FiUser, FiSettings } from 'react-icons/fi';

export default function Home() {
  const [email, setEmail] = useState('seu-email@exemplo.com');
  const [senha, setSenha] = useState('senha-segura-123');
  const [logado, setLogado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  const fazerLogin = async (e) => {
    e.preventDefault();
    if (email === 'seu-email@exemplo.com' && senha === 'senha-segura-123') {
      setLogado(true);
      localStorage.setItem('admin-logado', 'true');
    } else {
      alert('Dados incorretos!');
    }
  };

  if (logado) {
    return (
      <div className="pagina-admin">
        <div className={`menu-lateral ${menuAberto ? 'aberto' : ''}`}>
          <button className="fechar-menu" onClick={() => setMenuAberto(false)}>
            <FiX size={24} />
          </button>
          <div className="perfil-menu">
            <h2>Kayck (Admin)</h2>
            <p>Plano Vitalício</p>
          </div>
          <nav>
            <a href="#ias"><FiBot size={20} /> Minhas IAs</a>
            <a href="#sites"><FiGlobe size={20} /> Sites de Marketing</a>
            <a href="#perfil"><FiUser size={20} /> Meu Perfil</a>
            <a href="#config"><FiSettings size={20} /> Configurações</a>
          </nav>
        </div>

        <div className="conteudo-principal">
          <header>
            <button className="abrir-menu" onClick={() => setMenuAberto(true)}>
              <FiMenu size={24} />
            </button>
            <h1>NEXA AI - Painel Admin</h1>
          </header>

          <section className="cards">
            <div className="card">
              <FiBot size={32} />
              <h3>Assistentes IA</h3>
              <p>Crie e gerencie suas I
