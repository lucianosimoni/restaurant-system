import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault();
    console.log('ForgotPass - Form submitted.');
  };

  return (
    <div>
      {/* Header */}
      <div>
        <h1>Esqueci minha senha</h1>
        <p>Redefinir senha através de código enviado ao email.</p>

        <button onClick={() => navigate('/')}>Tela inicial</button>
      </div>

      <form onSubmit={formSubmit}>
        <label htmlFor="em"></label>
        <input id="em" placeholder="Email" type="email"></input>
        <button type="submit">Enviar código</button>
      </form>
    </div>
  );
}
