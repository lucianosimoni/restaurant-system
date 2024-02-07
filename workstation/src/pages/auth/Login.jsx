import { Link } from 'react-router-dom';

export default function Login() {
  const formSubmit = (e) => {
    e.preventDefault();

    console.log('Login - Form Submitted');
  };

  return (
    <div className="flex flex-col w-full h-full p-8">
      {/* Header */}
      <section>
        <h1>Estação de Trabalho</h1>
        <p>Entrar para configurar Estação</p>

        <Link to={'/'}>
          <button>Tela Inicial</button>
        </Link>
      </section>

      <section>
        <form onSubmit={formSubmit} className="flex flex-col gap-4 border-4 border-pink-400">
          <input placeholder="Email" type="email" />
          <input placeholder="Senha" type="password" />
        </form>
      </section>
    </div>
  );
}
