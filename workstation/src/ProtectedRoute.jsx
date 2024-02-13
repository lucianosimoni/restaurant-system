/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useStaffStore } from './store/staffStore';

/**
 * Authenticates the Route. Redirects the user to a given path or renders the Element.
 * @param {string} redirectTo - In case of not authenticated, redirect to this route.
 * @param {element} routeElement - The JSX Component to render if authenticated.
 */
export default function ProtectedRoute({ redirectTo = '/', routeElement }) {
  if (!routeElement) throw new Error('ProtectedRoute is missing the routeElement prop.');

  const isAuthenticated = useStaffStore((state) => state.isAuthenticated);

  console.log(`checking protect route ${redirectTo}`);
  if (!isAuthenticated) {
    console.log('NOT AUTH !!!!');
    return <Navigate to={redirectTo} replace={true} />;
  }

  console.log('AUTH !!!!');
  return routeElement;
}
