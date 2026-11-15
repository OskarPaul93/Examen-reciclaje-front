import { useState, useEffect } from "react";
import PuntoCard from "./components/PuntoCard";
import "./App.css";

function App() {

    const [puntos, setPuntos] = useState([]);

    const [nombre, setNombre] = useState("");
    const [sector, setSector] = useState("");
    const [material, setMaterial] = useState("");
    const [capacidad, setCapacidad] = useState("");

    // Consultar los puntos de reciclaje
    const cargarPuntos = async () => {
        try {
            const respuesta = await fetch("http://localhost:8080/api/puntos");

            const datos = await respuesta.json();

            setPuntos(datos);

        } catch (error) {
            console.error("Error al cargar los puntos:", error);
        }
    };

    // Registrar un nuevo punto de reciclaje
    const registrarPunto = async (e) => {
        e.preventDefault();

        try {
            const nuevoPunto = {
                nombre: nombre,
                sector: sector,
                material: material,
                capacidad: Number(capacidad)
            };

            const respuesta = await fetch("http://localhost:8080/api/puntos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoPunto)
            });

            if (!respuesta.ok) {
                throw new Error("Error al registrar el punto");
            }

            alert("Punto de reciclaje registrado correctamente");

            setNombre("");
            setSector("");
            setMaterial("");
            setCapacidad("");

            cargarPuntos();

        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo registrar el punto");
        }
    };

    // Ejecutar la consulta al iniciar la página
    useEffect(() => {
        cargarPuntos();
    }, []);

    return (
        <div className="contenedor">

            <h1>Sistema de Puntos de Reciclaje</h1>

            <form onSubmit={registrarPunto}>

                <h2>Registrar punto de reciclaje</h2>

                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Sector"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Material"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Capacidad"
                    value={capacidad}
                    onChange={(e) => setCapacidad(e.target.value)}
                    required
                />

                <button type="submit">
                    Registrar punto
                </button>

            </form>

            <h2>Puntos de reciclaje registrados</h2>

            <div className="tarjetas">

                {puntos.map((punto) => (
                    <PuntoCard
                        key={punto.id}
                        punto={punto}
                    />
                ))}

            </div>

        </div>
    );
}

export default App;
