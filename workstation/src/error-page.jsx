import { Button, Card } from 'antd-mobile';
import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col h-full justify-center items-center">
      <Card className="w-1/2 text-center">
        <h1>Oops!</h1>
        <p>Algo de errado aconteceu.</p>
        <h2 className="text-4xl">{error.status}</h2>
        <p className="italic">{error.statusText || error.message}</p>

        <Link to={'/'}>
          <Button color="primary" size="large">
            Voltar à segurança
          </Button>
        </Link>
      </Card>
    </div>
  );
}
