import { useWorkstationStore } from '../../store/workstationStore.js';
import Login from './Login.jsx';
import { useStaffStore } from '../../store/staffStore.js';
import InitialSettings from './InitialSettings.jsx';

export default function AuthLayout() {
  const workstation = useWorkstationStore((state) => state);
  const staff = useStaffStore((state) => state);

  console.log('Workstation is:');
  console.dir(workstation);

  console.log('Staff is:');
  console.dir(staff);

  // Login
  if (!workstation.isAuthenticated) {
    return <Login />;
  }

  return <InitialSettings />;
}
