import { Link, useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();

    console.log('Login - Form Submitted');
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full w-full p-8">
      <header>
        <Link to={'/'}>
          <button>Tela Inicial</button>
        </Link>

        <h1>Saindo da Estação</h1>
        <p>Confirme sua identidade antes de sair.</p>
      </header>

      <main>
        <form onSubmit={formSubmit} className="flex flex-col gap-2">
          <section className="flex flex-col">
            <label htmlFor="em">Email</label>
            <input id="em" placeholder="fulano@saborgaucho.com" type="email" required />
          </section>
          <section className="flex flex-col">
            <label htmlFor="newPass">Senha</label>
            <input id="newPass" placeholder="••••••" type="password" required />
          </section>
          <button type="submit">Entrar</button>
        </form>
      </main>
    </div>
  );
}
