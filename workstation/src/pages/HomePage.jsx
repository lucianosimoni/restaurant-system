import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h1>Tela Principal</h1>

      <section className="border-2 border-black">
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
