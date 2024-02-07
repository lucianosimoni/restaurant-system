import { Link } from 'react-router-dom';

export default function ClockInOut() {
  return (
    <div>
      {/* Header */}
      <section>
        <h1>Bater ponto</h1>

        <Link to={'/'}>
          <button>Tela inicial</button>
        </Link>
      </section>

      <main className="flex flex-col h-full w-full">
        <div className="bg-purple-500 h-full w-full text-center align-middle">Capturador de imagem</div>
        <button>Tirar foto</button>
      </main>
    </div>
  );
}
