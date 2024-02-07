import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col h-full justify-center items-center">
      {/* Header */}
      <section>
        <h1>Algo deu errado.</h1>
        <p>Tente novamente.</p>
        <p>{error.status}</p>
        <p className="italic">{error.statusText || error.message}</p>

        <Link to={'/'}>
          <button>Tela inicial</button>
        </Link>
      </section>
    </div>
  );
}
