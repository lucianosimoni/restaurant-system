// import { useStaffStore } from '../store/staffStore';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  // const staff = useStaffStore((state) => state);

  return <Outlet />;
}
