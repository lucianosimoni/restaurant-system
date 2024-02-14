import { Routes, Route } from 'react-router-dom';

import Root from './pages/Root.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/auth/Login.jsx';
import ClockInOut from './pages/timesheet/ClockInOut.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Settings from './pages/settings/Settings.jsx';
import InitialSettings from './pages/auth/InitialSettings.jsx';
import Logout from './pages/auth/Logout.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/logout"
          element={<ProtectedRoute routeElement={<Logout />} failureRedirect="/login" />}
        />
        <Route
          path="/initial-settings"
          element={<ProtectedRoute routeElement={<InitialSettings />} failureRedirect="/login" />}
        />
        <Route
          path="/clock-in-out"
          element={<ProtectedRoute routeElement={<ClockInOut />} failureRedirect="/login" />}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute routeElement={<Settings />} failureRedirect="/login" />}
        />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
