/* eslint-disable react/prop-types */
// import { Link } from 'react-router-dom';

/**
 *
 * @param props
 * @param {*} props.setIdChecked - Dispatch function to update the ClockInOut Layout State
 * @returns
 */
export default function IdCheck({ setIdChecked }) {
  return (
    <div className="flex flex-col w-full h-full p-8">
      <section>
        {/* <Link to={'/'}>
          <button>Tela inicial</button>
        </Link> */}

        <h1>Bater ponto</h1>
      </section>

      <main className="flex flex-col h-full w-full">
        <div className="bg-purple-500 h-full w-full text-center align-middle">Checar ID</div>
        <button onClick={() => setIdChecked(true)}>ID CORRETO (TEMP)</button>
      </main>
    </div>
  );
}
