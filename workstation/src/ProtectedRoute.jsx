/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { useStaffStore } from './store/staffStore';

/**
 * Authenticates the Route. Redirects the user to a given path or renders the Element.
 * @param props
 * @param {string} props.notAuthRedirect - In case of not authenticated, redirect to this route.
 * @param {React.JSX.Element} props.routeElement - The JSX Component to render if authenticated.
 * @returns {element}
 */
export default function ProtectedRoute({ notAuthRedirect = '/', routeElement }) {
  if (!routeElement) throw new Error('ProtectedRoute is missing the routeElement prop.');

  // TODO: WE SHOULD CHECK FOR THE WORKSTATION AUTHENTICATION, not the user.
  // Like, every day the workstation must check if itself is authenticated, IF NOT: Show a warning asking to be re-authenticated by...
  // ... another responsible staff.

  const isAuthenticated = useStaffStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={notAuthRedirect} replace={true} />;
  }

  return routeElement;
}
