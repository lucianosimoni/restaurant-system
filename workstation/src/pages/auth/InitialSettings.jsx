import { Link } from 'react-router-dom';

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
          <section className="flex flex-col">
            <label htmlFor="stationT">Configuração da Estação</label>
            <select id="stationT">
              <option value={'timesheet'}>Bater ponto</option>
              <option value={'stock-manager'}>Gerenciador de Estoque</option>
              <option value={'meat-treat'}>Tratar carnes</option>
            </select>
          </section>
          <button type="submit">Salvar</button>
        </form>
      </main>
    </div>
  );
}
