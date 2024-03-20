import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import StateContextProvider from './contexts/stateContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StateContextProvider>
    <App />
  </StateContextProvider>    
);

