import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full p-8">
      <header>
        <h1>Tela Principal</h1>
      </header>

      <main className="flex flex-col gap-2">
        <Link to={'/login'}>
          <Button variant="contained">Entrar</Button>
        </Link>
        {/* TODO: Remove because this is a protected route */}
        <p>Dev*</p>
        <Link to={'/logout'}>
          <Button variant="outlined">Sair</Button>
        </Link>
        <Link to={'/settings'}>
          <Button variant="outlined">Configurações da Estação (após login)</Button>
        </Link>
        <Link to={'/initial-settings'}>
          <Button variant="text">Initial Settings (após login)</Button>
        </Link>
        <p>Dev* Bater Ponto</p>
        <Link to={'/clock-in-out'}>
          <Button variant="text">Bater ponto (apos login)</Button>
        </Link>
      </main>
    </div>
  );
}
