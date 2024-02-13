import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './AppRoutes.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="h-[100dvh]">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  </React.StrictMode>,
);
