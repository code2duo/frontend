import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from "./app/contexts/AuthContext";
import App from './app/App';

import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <AuthProvider>
              <App />
          </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

