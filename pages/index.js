import { useState } from 'react';
import { FiLogIn, FiMenu, FiX, FiRobot, FiGlobe, FiUser, FiSettings } from 'react-icons/fi';

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
            <a href="#ias"><FiRobot size={20} /> Minhas IAs</a>
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
              <FiRobot size={32} />
              <h3>Assistentes IA</h3>
              <p>Crie e gerencie suas IAs personalizadas</p>
              <button>Criar Nova IA</button>
            </div>
            <div className="card">
              <FiGlobe size={32} />
              <h3>Sites de Marketing</h3>
              <p>Monte sites profissionais em minutos</p>
              <button>Criar Novo Site</button>
            </div>
          </section>

          <section className="templates">
            <h2>Templates Prontos</h2>
            <div className="grid-templates">
              <div className="template-item">
                <h4>IA de Marketing</h4>
                <p>Cria planos e estratégias digitais</p>
              </div>
              <div className="template-item">
                <h4>Site de Agência</h4>
                <p>Completo para consultorias de marketing</p>
              </div>
              <div className="template-item">
                <h4>IA de Redes Sociais</h4>
                <p>Produz conteúdo para todas as plataformas</p>
              </div>
              <div className="template-item">
                <h4>Landing Page de Vendas</h4>
                <p>Otimizada para converter visitantes em clientes</p>
              </div>
            </div>
          </section>
        </div>

        <style jsx global>{`
          * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
          .pagina-admin { display: flex; min-height: 100vh; background-color: #f8f9fa; }
          
          /* Menu lateral */
          .menu-lateral {
            width: 250px;
            background-color: #2d3748;
            color: white;
            padding: 20px;
            position: fixed;
            height: 100vh;
            left: -250px;
            transition: left 0.3s ease;
            z-index: 100;
          }
          .menu-lateral.aberto { left: 0; }
          .fechar-menu { background: none; border: none; color: white; margin-bottom: 20px; cursor: pointer; }
          .perfil-menu { margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #4a5568; }
          .menu-lateral nav a {
            display: flex;
            align-items: center;
            gap: 10px;
            color: white;
            text-decoration: none;
            padding: 10px 0;
            margin: 5px 0;
            border-radius: 5px;
            transition: background 0.2s;
          }
          .menu-lateral nav a:hover { background-color: #4a5568; padding-left: 10px; }
          
          /* Conteúdo principal */
          .conteudo-principal { flex: 1; padding: 20px; }
          header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30px;
            padding-bottom: 10px;
            border-bottom: 1px solid #e2e8f0;
          }
          .abrir-menu { background: none; border: none; cursor: pointer; display: block; }
          
          /* Cards */
          .cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 40px;
          }
          .card {
            background-color: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 15px;
            transition: transform 0.2s;
          }
          .card:hover { transform: translateY(-5px); }
          .card button {
            background-color: #4299e1;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 10px;
          }
          
          /* Templates */
          .templates { margin-top: 40px; }
          .grid-templates {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
          }
          .template-item {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            border-left: 4px solid #4299e1;
          }
        `}</style>
      </div>
    );
  }

  // Tela de login moderna
  return (
    <div className="pagina-login">
      <div className="card-login">
        <h1>NEXA AI</h1>
        <h2>Painel Administrador</h2>
        <form onSubmit={fazerLogin}>
          <div className="campo-form">
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="campo-form">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            <FiLogIn size={18} /> Entrar no Painel
          </button>
        </form>
      </div>

      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
        .pagina-login {
          min-height: 100vh;
          background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .card-login {
          background-color: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }
        .card-login h1 {
          color: #4299e1;
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        .card-login h2 {
          color: #2d3748;
          margin-bottom: 30px;
          font-weight: 500;
        }
        .campo-form {
          text-align: left;
          margin-bottom: 20px;
        }
        .campo-form label {
          display: block;
          margin-bottom: 5px;
          color: #4a5568;
          font-weight: 500;
        }
        .campo-form input {
          width: 100%;
          padding: 12px 15px;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }
        .campo-form input:focus {
          outline: none;
          border-color: #4299e1;
        }
        .card-login button {
          width: 100%;
          padding: 12px;
          background-color: #4299e1;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .card-login button:hover {
          background-color: #3182ce;
        }
      `}</style>
    </div>
  );
                                                                        }
  
