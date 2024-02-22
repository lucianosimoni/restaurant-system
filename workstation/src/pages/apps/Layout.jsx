import { Outlet } from 'react-router-dom';
import { useWorkstationStore } from '../../store/workstationStore';

export default function AppsLayout() {
  console.log('I am the Apps Layout');
  const workstation = useWorkstationStore((state) => state);

  return (
    <>
      <p>wrapped in the AppsLayout. check for F2 click to open setting in here.</p>
      <Outlet />;
    </>
  );
}
