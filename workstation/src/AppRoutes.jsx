import { Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout.jsx';
import Login from './pages/auth/Login.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Settings from './pages/settings/Settings.jsx';
import InitialSettings from './pages/settings/InitialSettings.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

import AppsLayout from './pages/apps/Layout.jsx';
import ClockInOutLayout from './pages/apps/clockinout/Layout.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />

        {/* 🛡️ Protected Routes */}
        <Route
          path="/initial-settings"
          element={<ProtectedRoute routeElement={<InitialSettings />} notAuthRedirect="/" />}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute routeElement={<Settings />} notAuthRedirect="/" />}
        />

        {/* 📱 Apps (Screens with actions) */}
        <Route
          path="/app"
          element={<ProtectedRoute routeElement={<AppsLayout />} notAuthRedirect="/" />}
        >
          <Route
            path="/app/clock-in-out"
            element={<ProtectedRoute routeElement={<ClockInOutLayout />} notAuthRedirect="/" />}
          />
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
