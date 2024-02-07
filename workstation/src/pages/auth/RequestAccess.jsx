import { Link } from 'react-router-dom';

export default function RequestAccess() {
  const formSubmit = (e) => {
    e.preventDefault();

    console.log('ReqAccess - Form Submitted.');
  };

  return (
    <div className="flex flex-col w-full h-full p-8">
      {/* Header */}
      <section>
        <Link to={'/'}>
          <button>Tela inicial</button>
        </Link>

        <h1>Pedir acesso ao sistema</h1>
        <p>Seu pedido será revisado por um administrador.</p>
      </section>

      <section>
        <form onSubmit={formSubmit} className="flex flex-col gap-2 ">
          <section className="flex flex-col">
            <label htmlFor="em">Email</label>
            <input id="em" placeholder="Email" type="email" required />
          </section>
          <section className="flex flex-col">
            <label htmlFor="fName">Primeiro Nome</label>
            <input id="fName" placeholder="Primeiro nome" type="text" required />
          </section>
          <section className="flex flex-col">
            <label htmlFor="sName">Segundo Nome</label>
            <input id="sName" placeholder="Segundo nome" type="text" required />
          </section>
          <section className="flex flex-col pl-4">
            <label htmlFor="newPass">Criar nova Senha</label>
            <input id="newPass" placeholder="Nova senha" type="password" required />
            <label htmlFor="confPass">Confirmar Senha</label>
            <input id="confPass" placeholder="Confirmar senha" type="password" required />
          </section>

          <button type="submit">Pedir acesso</button>
        </form>
      </section>
    </div>
  );
}
