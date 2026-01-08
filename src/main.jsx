import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterApp } from './router/RouterApp'

import { UserProvider } from './context/UserContext'

// importacion de estilos componentes
import "./styles/components/Header.css"
import "./styles/components/Footer.css"

// importacion de estilos paginas
import "./styles/pages/Register.css"
import "./styles/pages/Login.css"
import "./styles/pages/Home.css"
import "./styles/pages/Dashboard.css"
import "./styles/pages/Sobre-nosotros.css"




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterApp />
    </UserProvider>
  </StrictMode>,
)

