import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Home page</h1>
      <Link to={'/login'}>
        <Button>Login</Button>
      </Link>
    </div>
  );
}
