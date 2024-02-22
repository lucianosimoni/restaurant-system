/* eslint-disable react/prop-types */
// import { Link } from 'react-router-dom';
import { useWorkstationStore } from '../../../store/workstationStore.js';

/**
 *
 * @param props
 * @param {*} props.setIdChecked - Dispatch function to update the ClockInOut Layout State
 * @returns
 */
export default function IdCheck({ setIdChecked }) {
  const workstation = useWorkstationStore((state) => state);

  return (
    <div className="flex flex-col w-full h-full p-8">
      <section>
        <h1>Bater ponto</h1>
      </section>

      <main>
        <section>
          <h1>{workstation.title}</h1>
          <h4>Digitar seu ID</h4>
        </section>
      </main>

      <main className="flex flex-col h-full w-full">
        <div className="bg-purple-500 h-full w-full text-center align-middle">Checar ID</div>
        <button onClick={() => setIdChecked(true)}>ID CORRETO (TEMP)</button>
      </main>
    </div>
  );
}
