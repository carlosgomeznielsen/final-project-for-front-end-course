import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { login } = useAuth()

  const nagivate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault()

    // validador de campos
    const transporteDeErroresLogin = []
    if (!username) transporteDeErroresLogin.push("Falta colocar el nombre de usuario. ")
    if (!password) transporteDeErroresLogin.push("Falta colocar la contraseña. ")

    if (username && username.length <= 2) {
      transporteDeErroresLogin.push("El nombre de usuario debe tener más de dos caracteres. ")
    }
    if (password && password.length <= 3) {
      transporteDeErroresLogin.push("La contraseña debe tener más de tres caracteres. ")
    }

    if (transporteDeErroresLogin.length > 0) {
      setError(transporteDeErroresLogin)
      setTimeout(() => setError(""), 2000)
      return
    }
    setSuccess("Ingreso exitoso")

    console.log({ username, password })
    const isLogin = await login(username, password)

    if (isLogin) {
      setUsername("")
      setPassword("")
      nagivate("/")
    }
  }

  return (
    <Layout>
      <section className="login-section">
        <h1 className="login-h1">Inicia sesión</h1>
        <h2 className="login-h2">Hola, bienvenido de nuevo</h2>
        <div className="usuario-maestro">
          <p>Usuario Maestro Para Pruebas</p>
          <p className="login-p1">johnd</p>
          <p className="login-p2">m38rmF$</p>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-div-usuario">
            <p>Usuario:</p>
            <p>Ejemplo: juan</p>
            <label className="login-label-usuario"></label>
            <input
              className="login-input-usuario"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username} />
          </div>
          <div className="login-div-contraseña">
            <p>Contraseña:</p>
            <p>Ejemplo: afrF3%v</p>
            <label className="login-label-contraseña"></label>
            <input
              className="login-input-contraseña"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password} />
          </div>
          {
            error && <p className="login-error">{error}</p>
          }
          {
            success && <p className="login-success">{success}</p>
          }
          <button className="login-button-ingresar">Ingresar</button>
        </form>
      </section>
    </Layout>
  )
}

export { Login }

