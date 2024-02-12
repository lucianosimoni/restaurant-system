import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAuthStore } from '../store/authStore';

export default function Home() {
  const staff = useAuthStore((state) => state);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col w-full h-full p-8">
      <header>
        <h1>Tela Principal</h1>
        {staff.isAuthenticated ? (
          <h2>
            Autenticado como: {staff.info.firstName} {staff.info.lastName}
          </h2>
        ) : (
          <h2>Sem login.</h2>
        )}
      </header>

      <main className="flex flex-col gap-2">
        <Link to={'/login'}>
          <Button variant="contained">Entrar</Button>
        </Link>
        {/* TODO: Remove because this is a protected route */}
        <p>Dev*</p>
        <Button variant="outlined" onClick={handleLogout}>
          Sair
        </Button>
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
