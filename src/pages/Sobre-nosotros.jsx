import { Layout } from "../components/Layout"

const Sobrenosotros = () => {
    return (
        <Layout>
            <section className="sobrenosotros">
                <h1 className="h1-sobrenosotros">Sobre Nosotros</h1>
                <section className="seccion-sobrenosotros-uno">
                    <h2 className="sobrenosotros-h2-uno">¿De qué trata el proyecto?</h2>
                    <p className="sobrenosotros-p-uno">El proyecto trata sobre el fin del camino.<br></br>
                        El camino fue el recorrido por el
                        Curso de Programador Web Inicial -
                        Front End Developer - Turno Tarde.<br></br>
                        Este trabajo representa, en parte, el conocimiento
                        obtenido a traves de las clases del curso y sus
                        contenidos.
                    </p>

                </section>

                <section className="seccion-sobrenosotros-dos">
                    <h2 className="sobrenosotros-h2-dos">¿A quién va dirigido?</h2>
                    <p className="sobrenosotros-p-dos">Este proyecto va dirigido a los profesores del
                        Curso de Programador Web Inicial
                        - Front End Developer - Turno Tarde.<br></br>
                        Y a la institución Centro de e-Learning
                        UTN - Facultad Regional Buenos Aires.<br></br>

                    </p>

                </section>

                <section className="seccion-sobrenosotros-tres">
                    <h2 className="sobrenosotros-h2-tres">¿Qué tecnologías se usan?</h2>
                    <p className="sobrenosotros-p-tres">Este proyecto utiliza principalmente la
                        libreria React.<br></br>
                        Tambien, se utilizan los lenguajes:<br></br>
                        JavaScript,<br></br>
                        CSS,<br></br>
                        HTML.<br></br>
                        Ademas, para generara el repositorio, se utilizaron
                        los programas GIT y GitHub.
                    </p>

                </section>
            </section>
        </Layout>
    )
}

export { Sobrenosotros }