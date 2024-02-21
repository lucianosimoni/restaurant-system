import { Link } from 'react-router-dom';
import CompSelect from '../../components/CompSelect';
import { Button } from '@mui/material';

export default function InitialSettings() {
  const formSubmit = (e) => {
    e.preventDefault();

    console.log('Initial Setting - Form Submitted');
  };

  return (
    <div className="flex flex-col w-full h-full p-8">
      <header>
        <Link to={'/'}>
          <button>Tela inicial</button>
        </Link>

        <h1>Configurações Iniciais</h1>
        <p>Configuração inicial do dispositivo.</p>
      </header>

      <main>
        <form onSubmit={formSubmit} className="flex flex-col gap-2">
          <section className="flex flex-col">
            <label htmlFor="title">Titulo da Estacao</label>
            <input id="title" placeholder="Bater ponto - Salão" type="text" required />
          </section>
          <section className="flex flex-col">
            <label htmlFor="desc">Descrição</label>
            <input id="desc" placeholder="Ao lado do bebedouro" type="text" />
          </section>
          <section className="flex flex-col">
            <label htmlFor="img">Icone da Estação</label>
            <input id="img" type="file" accept=".jpg, .jpeg, .png" />
          </section>

          <CompSelect
            title="Configuração da Estação"
            items={[
              { t: 'Bater Ponto', v: 'bater-ponto' },
              { t: 'Gerenciador de Estoque', v: 'gerenciador-estoque' },
              { t: 'Tratar Carnes', v: 'tratar-carnes' },
            ]}
            variant="filled"
          />

          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </form>
      </main>
    </div>
  );
}
