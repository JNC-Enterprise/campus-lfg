import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import Groups from './Groups.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Groups />
  </StrictMode>,
)
