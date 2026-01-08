import { useState } from "react"
import { Layout } from "../components/Layout"

const Dashboard = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState("")



  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const transporteDeErroresDash = []
    if (!name) transporteDeErroresDash.push("Falta colocar nombre. ")
    if (!price) transporteDeErroresDash.push("Falta colocar precio. ")
    if (!description) transporteDeErroresDash.push("Falta colocar descripción. ")


    if (transporteDeErroresDash.length > 0) {
      setError(transporteDeErroresDash)
      setTimeout(() => setError(""), 2000)
      return
    }
    setSuccess("Producto ingresado con exito")
    setTimeout(() => setSuccess(""), 2000)


    const newProduct = {
      id: crypto.randomUUID(),
      title: name,
      price: price,
      description: description,
      category: "",
      image: ""
    }

    // petición al backend mediante fetch -> método POST https://fakeproductapi.com/products
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })

    const data = await response.json()
    setProduct(data)
    setName("")
    setPrice("")
    setDescription("")
  }

  return (
    <Layout>
      <section className="dashboard-section">
        <h1 className="dashboard-h1" >Panel de Administración</h1>
        <h2 className="dashboard-h2">Cargar nuevo producto</h2>
        <form className="dashboard-form" onSubmit={handleSubmit}>
          <div className="dashboard-div-producto" >
            <p className="dashboard-p-producto">Nombre del producto:</p>
            <p className="dashboard-ejemplo-producto">Ejemplo: Pelota</p>
            <label className="dashboard-label-producto" ></label>
            <input className="dashboard-input-producto" type="text" name="nombre" onChange={(e) => setName(e.target.value)} value={name} />
          </div>

          <div className="dashboard-div-precio">
            <p className="dashboard-p-precio">Precio:</p>
            <p className="dashboard-ejemplo-producto">Ejemplo: 4000.00</p>
            <label className="dashboard-label-precio"></label>
            <input className="dashboard-input-precio" type="number" name="precio" onChange={(e) => setPrice(e.target.value)} value={price} />
          </div>

          <div className="dashboard-div-descripcion">
            <p className="dashboard-p-descripcion">Descripción:</p>
            <p className="dashboard-ejemplo-producto">Ejemplo: Pelota azul. Ultra resistente</p>
            <label className="dashboard-label-descripcion"></label>
            <textarea className="dashboard-textarea-descripcion" name="descripcion" rows="4" onChange={(e) => setDescription(e.target.value)} value={description} />
          </div>

          {error && <p className="dashboard-error">{error}</p>}
          {success && <p className="dashboard-success">{success}</p>}

          <button className="dashboard-button" >Guardar producto</button>
        </form>

        {
          product && <div className="dashboard-div-prod-recibido">
            <h2 className="dashboard-h2-prod-recibido">Ultimo Producto Guardado</h2>
            <h3 className="dashboard-titulo-prod-recibido">{product.title}</h3>
            <p className="dashboard-precio-prod-recibido">${product.price}</p>
            <p className="dashboard-description-prod-recibido">{product.description}</p>
          </div>
        }
      </section>
    </Layout>
  )
}

export { Dashboard }
