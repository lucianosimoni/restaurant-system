import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { wrongPasswordOrUsername } from '../../utils/errorResponses.js';

import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import { useAuthStore } from '../../store/authStore.js';

export default function Login() {
  const [waiting, setWaiting] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const staffLogin = useAuthStore((state) => state.login);
  const staff = useAuthStore((state) => state);
  const navigate = useNavigate();

  const formSubmit = async (e) => {
    e.preventDefault();
    setWaiting(true);

    const username = e.target.userOrEmail.value;
    const password = e.target.password.value;

    try {
      const res = await axios.post('http://localhost:4000/auth/staff/login', { username, password });
      if (res.status != 200) {
        throw new Error('Response Status code is not 200');
      }
      const { loggedInStaff } = res.data;
      console.log(loggedInStaff);
      staffLogin(loggedInStaff);
    } catch (err) {
      setWrongCredentials(true);
      switch (err.response.status) {
        case 401:
          wrongPasswordOrUsername();
          break;
        default:
          console.error(err.response);
          break;
      }
    }
    setWaiting(false);
    // navigate('/initial-settings');
  };

  return (
    <div className="flex flex-col w-full h-full p-8">
      <Container fixed>
        <header>
          <Link to={'/'}>
            <button>Tela Inicial</button>
          </Link>

          <Typography variant="h3">Estação de Trabalho</Typography>
          <Typography variant="h6">Entrar para configurar Estação</Typography>
          <Typography variant="body1">{staff.username}</Typography>
        </header>

        <main>
          <form onSubmit={formSubmit} onChange={() => setWrongCredentials(false)} className="flex flex-col gap-2">
            <TextField id="userOrEmail" variant="filled" label="Nome de Usuario" type="text" required />
            <TextField id="password" variant="filled" label="Senha" type="password" required />

            <Grow in={wrongCredentials} mountOnEnter unmountOnExit>
              <Alert severity="error">
                Usuario ou Senha incorretos. Todas as senhas devem ter ao menos 6 caracteres.
              </Alert>
            </Grow>

            <LoadingButton loading={waiting} variant="contained" type="submit">
              Entrar
            </LoadingButton>
          </form>
        </main>
      </Container>
    </div>
  );
}
