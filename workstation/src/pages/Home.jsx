import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full p-8">
      <header>
        <h1>Tela Principal</h1>
      </header>

      <main className="flex flex-col gap-2">
        <Link to={'/login'}>
          <button>Entrar</button>
        </Link>
        {/* TODO: Remove because this is a protected route */}
        <p>Dev*</p>
        <Link to={'/logout'}>
          <button>Sair</button>
        </Link>
        <Link to={'/settings'}>
          <button>Configurações da Estação (após login)</button>
        </Link>
        <Link to={'/initial-settings'}>
          <button>Initial Settings (após login)</button>
        </Link>
        <p>Dev* Bater Ponto</p>
        <Link to={'/clock-in-out'}>
          <button>Bater ponto (apos login)</button>
        </Link>
      </main>
    </div>
  );
}
