import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"





const Header = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="header-header">
      <nav className="header-nav">
        <ul className="header-ul">
          {/* Cambiar elementos a por componentes Link de react-router-dom */}
          {
            user && <>
              <li className="header-li-1-user"><Link to="/">Inicio</Link></li>
              <li className="header-li-2-user"><Link to="/dashboard">Dashboard</Link></li>
              <li className="header-li-3-user"><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
              <button className="header-button" onClick={handleLogout}>Cerrar sesión</button>
            </>
          }
          {
            !user && <>
              <li className="header-li-1-nouser"><Link to="/">Inicio</Link></li>
              <li className="header-li-2-nouser"><Link to="/login">Login</Link></li>
              <li className="header-li-3-nouser"><Link to="/registrate">Registrate</Link></li>
              <li className="header-li-4-nouser"><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
            </>
          }
        </ul>
      </nav>
    </header>
  )
}

export { Header }