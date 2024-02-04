import { useState } from 'react';
// import restaurantLogo from '/restaurant.svg'; // at the public folder
import { Button, SafeArea } from 'antd-mobile';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-pink-400">
        <SafeArea position="top" />
      </div>

      <div className=" h-[100dvh] p-8 flex flex-col justify-center text-center">
        <div>
          <h1>Estação de Trabalho</h1>
          <p>Sabor Gáucho</p>
        </div>

        <Button
          color="primary"
          fill="solid"
          shape="rounded"
          className="w-fit"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </Button>
      </div>

      <div className="bg-pink-400">
        <SafeArea position="bottom" />
      </div>
    </>
  );
}

export default App;
