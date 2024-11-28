import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // Add this import
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)