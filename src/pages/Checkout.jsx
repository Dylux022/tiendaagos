import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config.js";
import '../styles/checkout.css';

const Checkout = ({ carrito, vaciarCarrito }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !email || !telefono) {
      setMensajeError("Por favor, completa todos los campos");
      return;
    }

    const orden = {
      comprador: { nombre, email, telefono },
      items: carrito.map(p => ({
        id: p.id,
        name: p.name,
        cantidad: p.cantidad,
        price: p.price,
        subtotal: p.price * p.cantidad
      })),
      total: carrito.reduce((acc, p) => acc + p.price * p.cantidad, 0),
      fecha: Timestamp.fromDate(new Date()),
    };

    try {
      // Subir orden a Firebase
      const docRef = await addDoc(collection(db, "ordenes"), orden);
      console.log("Orden creada con ID: ", docRef.id);

      // Vaciar carrito
      vaciarCarrito();

      // Redirigir a Gracias pasando el ID de la orden
      navigate("/gracias", { state: { idOrden: docRef.id, carrito: orden.items, total: orden.total } });
    } catch (error) {
      console.error("Error al crear la orden: ", error);
      setMensajeError("Hubo un error al procesar la compra, intenta nuevamente.");
    }
  };

  return (
    <div className="checkout-container">
      <h2>Finalizar Compra</h2>
      {mensajeError && <p className="mensaje-error">{mensajeError}</p>}
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Teléfono:
          <input
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </label>

        <h3>Productos en tu carrito</h3>
        <ul>
          {carrito.map((p) => (
            <li key={p.id}>
              {p.name} x {p.cantidad} - ${p.price * p.cantidad}
            </li>
          ))}
        </ul>

        <p>
          <strong>Total: $
            {carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0)}
          </strong>
        </p>

        <button type="submit">Finalizar Compra</button>
      </form>
    </div>
  );
};

export default Checkout;
