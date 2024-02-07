import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Login from './pages/auth/Login.jsx';
import ClockInOut from './pages/timesheet/ClockInOut.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Settings from './pages/settings/Settings.jsx';
import InitialSettings from './pages/auth/InitialSettings.jsx';
import Logout from './pages/auth/Logout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  { path: '/login', element: <Login /> },
  { path: '/logout', element: <Logout /> },
  { path: '/initial-settings', element: <InitialSettings /> },
  { path: '/clock-in-out', element: <ClockInOut /> },
  { path: '/settings', element: <Settings /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="h-[100dvh]">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
);
