import { Button, Input, Space } from 'antd-mobile';

export default function Login() {
  return (
    <div className="flex flex-col w-full h-full p-8">
      <Button color="primary" className="w-24">
        Voltar
      </Button>

      <div className="p-4">
        <form className="flex flex-col gap-4 border-4 border-pink-400">
          <Input type="email" placeholder="Email" aria-required clearable />
          <Input type="password" placeholder="Senha" aria-required clearable />
          <Button type="submit" color="primary">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
