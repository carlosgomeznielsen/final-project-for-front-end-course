import { useState } from "react"
import { Layout } from "../components/Layout"

//
import { useAuth } from "../context/UserContext"

//
import { useNavigate } from "react-router-dom"

//import { resolve } from "path"

const Register = () => {
  //const [id, setId] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  //
  const { register } = useAuth()

  //
  const nagivate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()




    // limpieza
    setError("")
    setSuccess("")



    /*  
    if (!username || !email || !password) {
      setError("Debes completar todos los campos")
      return
    }

    //
    const correovalido = email.includes("@")
    if (!correovalido) {
      //setError("Debe poner un formato de correo valido")
      console.log("Debe poner un formato de correo valido")
      return
    } else {
      console.log("Formato de correo valido")
    }

    if (password.length <= 3) {
      setError("Debe poner una contraseña con más larga")
      return

    }

    // el envio de datos y la rediccion a la pagina Home,
    // lo dejo debajo de la condicion if.
    // Que verifica si los campos de entrada estan vacios o no.

    // envio de datos a funcion register en UserContext.jsx
    register(username, email, password)

    // redirigo a la pagina home
    nagivate("/")
    */



    // SISTEMA DE ERRORES ACUMULATIVOS

    // array que va contener diferentes valores de acuerdo a los
    // errores que sucedan.
    const transporteDeErrores = []


    // para saber si los inputs estan vacios.
    // en los tres casos se entran en el if si no hay correo.
    // hay correo (username=true) => (!username=false). En este caso no se entra en el if.
    // no hay correo (username=true) => (!username=true). En este caso se entra en el if.
    // y se coloca el mensaje al array.
    if (!username) transporteDeErrores.push("Falta colocar el nombre de usuario. ")
    if (!email) transporteDeErrores.push("Falta colocar la dirección. ")
    if (!password) transporteDeErrores.push("Falta colocar la contraseña.")

    // si hay nombre se usuario y el nombre de usuario es menor o igual a dos caracteres,
    // se entra al if. si no hay nombre de usuario en primer lugar, no entra en el if.
    if (username && username.length <= 2) {
      transporteDeErrores.push("El nombre de usuario debe tener más de dos caracteres. ")
    }

    // condicion que verifica la cantidad de caracteres en la contraseña.
    // si hay contraseña y la contraseña es menor e igual a tres caracteres,
    // se entra en el if. si no hay contraseña en primer lugar, no entra en el if.
    if (password && password.length <= 3) {
      // se coloca el mensaje al array
      transporteDeErrores.push("La contraseña debe tener más de tres caracteres")
    }

    // condicion que verifica el formato del correo con una expresion regular (regex).
    // LA EXPRESION REGULAR NO SE VIO EN ESTE CURSO. LA ESTOY SACANDO DE OTRA PARTE.
    // si hay correo y el correo NO respeta la expresion regular correspondiente a un correo,
    // se entra en el if. si no hay correo en primer lugar, no entra al if
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // se coloca el mensaje al array
      transporteDeErrores.push("La dirección de correo no es correcta")
    }

    // condicion que detecta la longitud del array transporteDeErrores.
    // si este array tiene contenido, su longuitud va a ser mayor a cero.
    // por lo tanto, se entra en el if.
    if (transporteDeErrores.length > 0) {
      // se coloca el mensaje del array en el estado.
      setError(transporteDeErrores)
      // lapso de tiempo en mostrarse el mensaje. dos segundos.
      setTimeout(() => setError(""), 2000)
      // se detiene la continuacion del resto del codigo.
      return
    }

    const newUser = {
      username,
      email,
      password
    }

    // envio datos del nuevo usuario a la funcion register en UserContext.jsx
    register(username, email, password)

    // imprime por consola el usuario nuevo
    console.log(newUser)

    // se coloca el mensaje al estado
    setSuccess("Usuario registrado con éxito")

    // se redirige despues de dos segundos.
    // para que se pueda ver el mensaje de "Usuario registrado con éxito".
    setTimeout(() => nagivate("/"), 2000)

    setUsername("")
    setEmail("")
    setPassword("")


  }

  return (
    <Layout>
      <section className="register-section">
        <h1 className="register">Registración de Usuario</h1>
        <h2 className="register">Hola, aqui te registras por primera vez</h2>
        {/*noValidate lo puse para que el html del navegador no bloque mi advertencia del
        correo invalido. si no lo pongo el navegador google chrome impone su propio mensaje*/}
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          <div className="register">
            <p className="register-p-nombredeusuario">Username:</p>
            <p>Ejemplo: juan</p>
            <label className="register"></label>
            <input
              className="register"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="register">
            <p className="register-p-correo">Correo electrónico:</p>
            <p>Ejemplo: juan@gmail.com</p>
            <label className="register" ></label>
            <input
              className="register"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="register">
            <p className="register-p-contraseña">Contraseña:</p>
            <p>Ejemplo: afrF3%v</p>
            <label className="register"></label>
            <input
              className="register"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="register" >Ingresar</button>
        </form>

        {
          error && <p className="register-error">{error}</p>
        }
        {
          success && <p className="register-success">{success}</p>
        }
      </section>
    </Layout>
  )
}

export { Register }



/*


exprecion regular para validar correo.



^	        Indica el inicio del string.

[^\s@]+	  1+ caracteres que no sean espacios (\s) ni @. Ej: usuario12.

@	        Requiere el carácter @ literal.

[^\s@]+	  1+ caracteres que no sean espacios ni @. Ej: gmail.

\.	      Requiere un punto literal (escapado con \ porque . en regex es "cualquier carácter").

[^\s@]+	  1+ caracteres que no sean espacios ni @. Ej: com, es, net.

$	        Indica el final del string.


.test()   METODO. verifica si un string coincide con el patrón definido por la expresión regular. 


*/
