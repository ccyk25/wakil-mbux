import React from 'react'
import { createRoot } from 'react-dom/client'
import { MbuxProvider } from './store.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MbuxProvider>
      <App />
    </MbuxProvider>
  </React.StrictMode>,
)
