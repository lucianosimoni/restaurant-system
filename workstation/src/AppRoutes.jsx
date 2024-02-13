import { Routes, Route } from 'react-router-dom';

import Root from './pages/Root.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/auth/Login.jsx';
import ClockInOut from './pages/timesheet/ClockInOut.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Settings from './pages/settings/Settings.jsx';
import InitialSettings from './pages/auth/InitialSettings.jsx';
import Logout from './pages/auth/Logout.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/logout"
          element={<ProtectedRoute routeElement={<Logout />} redirectTo="/login" />}
        />
        <Route
          path="/initial-settings"
          element={<ProtectedRoute routeElement={<InitialSettings />} redirectTo="/login" />}
        />
        <Route
          path="/clock-in-out"
          element={<ProtectedRoute routeElement={<ClockInOut />} redirectTo="/login" />}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute routeElement={<Settings />} redirectTo="/login" />}
        />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
