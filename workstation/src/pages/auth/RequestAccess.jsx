import { Link } from 'react-router-dom';

export default function RequestAccess() {
  return (
    <div>
      {/* Header */}
      <section>
        <h1>Pedir acesso ao sistema</h1>
        <p>Seu pedido será revisado por um administrador.</p>

        <Link to={'/'}>
          <button>Tela inicial</button>
        </Link>
      </section>
    </div>
  );
}
