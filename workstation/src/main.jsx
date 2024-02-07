import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Login from './pages/auth/Login.jsx';
import RequestAccess from './pages/auth/RequestAccess.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import ClockInOut from './pages/timesheet/ClockInOut.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Settings from './pages/settings/Settings.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  { path: '/login', element: <Login /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/request-access', element: <RequestAccess /> },
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
