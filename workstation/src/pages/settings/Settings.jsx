import { Link } from 'react-router-dom';

export default function Settings() {
  return (
    <div className="flex flex-col w-full h-full p-8">
      {/* Header */}
      <header>
        <Link to={'/'}>
          <button>Deslogar *TODO</button>
        </Link>

        <h1>Configurações da Estação</h1>
        <p>Define que tipo de estação será esta.</p>
      </header>

      <main>
        <section className="flex flex-col">
          <label htmlFor="stationT">Tipo de Estação</label>
          <select id="stationT">
            <option value={'timesheet'}>Bater ponto</option>
            <option value={'stock-manager'}>Gerenciador de Estoque</option>
            <option value={'meat-treat'}>Tratar carnes</option>
          </select>
        </section>
      </main>
    </div>
  );
}
