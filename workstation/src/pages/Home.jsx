import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full p-8">
      {/* Header */}
      <section>
        <h1>Tela Principal</h1>
      </section>

      <section className="flex flex-col gap-2">
        <Link to={'/login'}>
          <button>Entrar</button>
        </Link>
        <Link to={'/request-access'}>
          <button>Pedir Acesso</button>
        </Link>
      </section>
    </div>
  );
}
