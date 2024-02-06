import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Login from './routes/auth/login.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './error-page.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
  },
  { path: '/auth/login', element: <Login /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="h-[100dvh]">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
);
