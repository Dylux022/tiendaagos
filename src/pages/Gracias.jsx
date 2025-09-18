import { useLocation, Link } from "react-router-dom";
import "../styles/gracias.css";


const Gracias = () => {
  const location = useLocation();
  const { state } = location;
  const { idOrden, carrito, total } = state || {};

  if (!state) {
    return (
      <div className="gracias-container">
        <h2>Gracias por tu compra!</h2>
        <p>No se encontró información de la orden.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <div className="gracias-container">
      <h2>🎉 ¡Gracias por tu compra!</h2>
      <p>Tu orden se ha generado correctamente.</p>
      <p><strong>ID de la orden:</strong> {idOrden}</p>

      <h3>Resumen de tu compra:</h3>
      <ul>
        {carrito.map((item) => (
          <li key={item.id}>
            {item.name} x {item.cantidad} - ${item.price * item.cantidad}
          </li>
        ))}
      </ul>

      <p><strong>Total pagado:</strong> ${total}</p>

      <Link to="/">
        <button className="btn-volver">Volver al inicio</button>
      </Link>
    </div>
  );
};

export default Gracias;
