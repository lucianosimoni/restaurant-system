import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ErrorPage() {
  return (
    <div className="flex flex-col h-full justify-center items-center gap-8">
      <div>
        <Typography variant="h1">404</Typography>
        <Typography variant="subtitle1">Página não encontrada.</Typography>
      </div>

      <Link to={'/'}>
        <Button variant="contained" color="primary" size="large">
          Voltar para Tela Inicial
        </Button>
      </Link>
    </div>
  );
}
