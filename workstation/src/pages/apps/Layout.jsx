import { Outlet } from 'react-router-dom';

export default function AppsLayout() {
  console.log('I am the Apps Layout');
  return (
    <>
      <p>wrapped in the AppsLayout. check for F2 click to open setting in here.</p>
      <Outlet />;
    </>
  );
}
