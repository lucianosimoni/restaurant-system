import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const nav = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();

    console.log('Login - Form Submitted');
    nav('/initial-settings');
  };

  return (
    <div className="flex flex-col w-full h-full p-8">
      {/* Header */}
      <header>
        <Link to={'/'}>
          <button>Tela Inicial</button>
        </Link>

        <h1>Estação de Trabalho</h1>
        <p>Entrar para configurar Estação</p>
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
