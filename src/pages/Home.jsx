import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"


const Home = () => {
  const [products, setProducts] = useState([])
  const [showPopup, setShowPopup] = useState(null)
  const [productToEdit, setProductToEdit] = useState(null)
  const [titleEdit, setTitleEdit] = useState("")
  const [priceEdit, setPriceEdit] = useState("")
  const [descriptionEdit, setDescriptionEdit] = useState("")
  const [categoryEdit, setCategoryEdit] = useState("")
  const [imageEdit, setImageEdit] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // PARA LA BARRA DE BUSQUEDA DE PRODUCTOS
  // estados para la barra de busqueda
  // el valor inicial es string vacio
  // cuando tiene valor contiene 
  const [BusquedaProductos, setBusquedaProductos] = useState("")

  // simulando existencia del usuario, proximamente este estado será global
  const { user } = useAuth()

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products", { method: "GET" })
    const data = await response.json()
    setProducts(data)
  }

  // El array vacío (dependencias) espera a que
  // ejecute el return del jsx. Si tiene algo,
  // useEffect se va a ejecutar cada vez que se
  // modifique lo que este dentro de la dependencia.
  useEffect(() => {
    fetchingProducts()
  }, [])

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })

    if (response.ok) {
      setProducts(prevProduct => prevProduct.filter((product) => product.id != id))
      // fetchingProducts()
    }
  }

  const handleOpenEdit = (product) => {
    setShowPopup(true)
    setProductToEdit(product)
    setTitleEdit(product.title)
    setPriceEdit(product.price)
    setDescriptionEdit(product.description)
    setCategoryEdit(product.category)
    setImageEdit(product.image)
  }

  // petición al backend mediante fetch para modificar-> método PATCH / PUT https://fakeproductapi.com/products
  const handleUpdate = async (e) => {
    e.preventDefault()



    // validores de inputs del formulario para actulizar productos.
    const transporteDeErroresHome = []
    if (!titleEdit) transporteDeErroresHome.push("Falta colocar titulo. ")
    if (!priceEdit) transporteDeErroresHome.push("Falta colocar precio. ")
    if (!descriptionEdit) transporteDeErroresHome.push("Falta colocar descripción. ")
    if (!categoryEdit) transporteDeErroresHome.push("Falta colocar categoria. ")
    if (!imageEdit) transporteDeErroresHome.push("Falta colocar imagen.")


    if (transporteDeErroresHome.length > 0) {
      setError(transporteDeErroresHome)
      setTimeout(() => setError(""), 2000)
      return
    }


    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit
    }

    setSuccess("Producto actualizado con exito")
    setTimeout(() => setSuccess(""), 2000)

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedProduct)
      })

      if (response.ok) {
        const data = await response.json()
        setProducts(prevProduct =>
          prevProduct.map((product) =>
            product.id === productToEdit.id
              ? data
              : product
          ))
        // fetchingProducts()
      }
      setShowPopup(false)
    } catch (error) {
      console.log(error)
    }


  }





  // FUNCION ENCARGADA DEL FILTRADO DE PRODUCTOS 
  // PARA LA BARRA DE BUSQUEDA PARCIAL DE PRODUCTOS
  const filtradoProductos = products.filter(product => product.title.toLowerCase().includes(BusquedaProductos.toLowerCase()))
  // products  ES EL ARRAY (ESTADO) DE PRODUCTOS.
  // filter   FILTRO SOBRE ESTE ESTADO. Y ME DEVUELVE UN ARRAY DESPUES DE LA CONDICION.
  // A filter LE DOY UNA FUNCION CALLBACK QUE SE EJECUTA CON CADA PRODUCTO.
  // ESTA FUNCION ES:   product => product.title.toLowerCase().includes(searchTerm.toLowerCase())
  // ESTA FUNCION DEVUELVE TRUE SI ENCUENTRA COINCIDENCIA ENTRE EL VALOR DEL INPUT Y LOS NOMBRES DEL PRODUCTO
  // AL SER TRUE SE INCLUYE AL NUEVO ARRAY DE FILTER.
  // DA FALSO CUANDO NO HAY COINCIDENCIA ENTRE TITULOS. EXCLUYE DEL NUEVO ARRAY EL PRODUCTO.

  //    product.title.toLowerCase()
  // DEL ESTADO product OBTENGO LOS TITULOS (title) Y LO PASO A MINUSCULA .toLowerCase()
  // AL PASARLO A MINUSCULA ME EVITO ERRORES POR PARTE DEL USUARIO QUE GENERE PROBLEMAS EN LA BUSQUEDA DEL PRODUCTO.
  // EVITANDO LA DISCRIMINACION ENTRE MINUSCULA Y MAYUSCULAS.

  //    BusquedaProductos.toLowerCase()
  // PASO A MINUSCULA LA PALABRA QUE OBTENGO DEL INPUT. DEL USUARIO.

  // CONDICION

  // .includes()
  // ESTA ES LA CONDICION QUE COMPARA EL TITULO DEL ARRAY (ESTADO) DE PRODUCTOS Y LA PALABRA QUE COLOCO EL USUARIO.
  // DEVUELVE TRUE SI HAY COINCIDENCIA.
  // DEVUELVE FALSE SI NO HAY COINCIDENCIA.

  return (
    <Layout>
      <section className="hero">
        <div>
          <h1>Compras S.A.</h1>
        </div>
      </section>
      <section className="seccion-bienvenida">
        <div>
          <h1 className="titulo-bienvenida">Bienvenido a Nuestra Tienda</h1>
          <p className="parrafo-bienvenida">Descubrí una selección exclusiva de productos para vos. Calidad, confianza y atención personalizada.</p>
        </div>
      </section>

      <section className="seccion-porqueelegirnos">
        <h2>¿Por qué elegirnos?</h2>
        <ul>
          <li>
            <h3>Envíos a todo el país</h3>
            <p>Recibí tu compra en la puerta de tu casa estés donde estés.</p>
          </li>
          <li>
            <h3>Pagos seguros</h3>
            <p>Trabajamos con plataformas que garantizan tu seguridad.</p>
          </li>
          <li>
            <h3>Atención personalizada</h3>
            <p>Estamos disponibles para ayudarte en todo momento.</p>
          </li>
        </ul>
      </section>



      <section className="presentacion-productos">
        <div>
          <h2>Nuestros productos</h2>
          <p>Elegí entre nuestras categorías más populares.</p>
        </div>
        {/*PARA LA BARRA DE BUSQUEDA DE PRODUCTOS*/}
        <h2>Busqueda de productos</h2>
        <input
          className="home-input"
          type="text"
          // ACTUALIZA EL VALOR DEL ESTADO CON EL VALOR ACTUAL DEL INPUT.
          onChange={(e) => setBusquedaProductos(e.target.value)}
          // EL VALOR DEL INPUT SIEMPRE VA A SER EL MISMO VALOR QUE TIENE EL ESTADO.
          value={BusquedaProductos}
        />
      </section>

      <section className="seccion-productos">
        {
          showPopup && <section className="popup-edit">
            <h2>Editando producto...</h2>

            <form className="formulario-popup" onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Ingrese el titulo"
                value={titleEdit}
                onChange={(e) => setTitleEdit(e.target.value)}
              />
              <input
                type="number"
                placeholder="Ingrese el precio"
                value={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}
              />
              <textarea
                placeholder="Ingrese la descripción"
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
              ></textarea>
              <input
                type="text"
                placeholder="Ingrese la categoria"
                value={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
              />
              <input
                type="text"
                placeholder="Ingrese la URL de la imagen"
                value={imageEdit}
                onChange={(e) => setImageEdit(e.target.value)}
              />
              {/*si el estado error tiene valor y .....*/}
              {error && <p className="home-error">{error}</p>}
              {/*si el estado success tiene valor y .....*/}
              {success && <p className="home-success">{success}</p>}
              <button>Actualizar</button>
              <button onClick={() => setShowPopup(null)}>Cerrar</button>
            </form>
          </section>
        }

        {/*products.map*/}
        <div className="productos">
          {
            filtradoProductos.map((product) => <div className="datos-productos"><div className="datos" key={product.id}>
              <h2>{product.title}</h2>
              <p>${product.price}</p>
              <img width="80px" src={product.image} alt={`Imagen de ${product.title}`} />
              <p><strong>{product.category}</strong></p>
              <p>{product.description}</p>
            </div>
              {
                user && <div className="actualizar-borrar-producto">
                  <button
                    onClick={() => handleOpenEdit(product)}
                    className="actualizar-boton-producto">Actualizar</button>
                  <button onClick={() => handleDelete(product.id)} className="Borrar-boton-producto">Borrar</button>
                </div>
              }
            </div>)
          }
        </div>
      </section>
    </Layout>
  )
}

export { Home }