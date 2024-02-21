/* eslint-disable react/prop-types */
// import { Link } from 'react-router-dom';

/**
 *
 * @param props
 * @param {*} props.setPhotoChecked - Dispatch function to update the ClockInOut Layout State
 * @returns
 */
export default function PhotoCheck({ setPhotoChecked }) {
  return (
    <div className="flex flex-col w-full h-full p-8">
      <section>
        {/* TODO: Fix this and IdCheck */}
        {/* <Link to={'/'}>
          <button>Tela inicial</button>
        </Link> */}

        <h1>Bater ponto</h1>
      </section>

      <main className="flex flex-col h-full w-full">
        <div className="bg-purple-500 h-full w-full text-center align-middle">
          Capturador de imagem
        </div>
        <button onClick={() => setPhotoChecked(true)}>Tirar foto</button>
      </main>
    </div>
  );
}
