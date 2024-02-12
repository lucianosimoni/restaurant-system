import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Root from './pages/Root.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/auth/Login.jsx';
import ClockInOut from './pages/timesheet/ClockInOut.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Settings from './pages/settings/Settings.jsx';
import InitialSettings from './pages/auth/InitialSettings.jsx';
import Logout from './pages/auth/Logout.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="h-[100dvh]">
      <Router>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/initial-settings" element={<InitialSettings />} />
            <Route path="/clock-in-out" element={<ClockInOut />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  </React.StrictMode>,
);
