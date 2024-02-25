import { Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout.jsx';
import Home from './pages/Home.jsx';
import AuthLayout from './pages/auth/AuthLayout.jsx';
import Settings from './pages/settings/Settings.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import AppsLayout from './pages/apps/AppsLayout.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

import ClockInOutLayout from './pages/apps/clockinout/ClockInOutLayout.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthLayout />} />

        {/* 🛡️ Protected Routes */}
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
