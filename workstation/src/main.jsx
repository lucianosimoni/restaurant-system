import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './ErrorPage.jsx';
import HomePage from './pages/HomePage.jsx';
import Login from './pages/auth/login.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  { path: '/login', element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="h-[100dvh]">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
);
