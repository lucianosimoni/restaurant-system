/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useStaffStore } from './store/staffStore';

/**
 * Authenticates the Route. Redirects the user to a given path or renders the Element.
 * @param {string} failureRedirect - In case of not authenticated, redirect to this route.
 * @param {element} routeElement - The JSX Component to render if authenticated.
 * @returns {element}
 */
export default function ProtectedRoute({ failureRedirect = '/', routeElement }) {
  if (!routeElement) throw new Error('ProtectedRoute is missing the routeElement prop.');

  const isAuthenticated = useStaffStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={failureRedirect} replace={true} />;
  }

  return routeElement;
}
