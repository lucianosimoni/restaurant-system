import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const formSubmit = (e) => {
    e.preventDefault();
    console.log('ForgotPass - Form submitted.');
  };

  return (
    <div className="flex flex-col w-full h-full p-8">
      {/* Header */}
      <div>
        <Link to={'/'}>
          <button>Tela inicial</button>
        </Link>

        <h1>Esqueci minha senha</h1>
        <p>Redefinir senha através de código enviado ao email.</p>
      </div>

      <form onSubmit={formSubmit}>
        <label htmlFor="em"></label>
        <input id="em" placeholder="Email" type="email"></input>
        <button type="submit">Enviar código</button>
      </form>
    </div>
  );
}
