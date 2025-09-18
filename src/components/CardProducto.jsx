import { useState } from "react";
import '../styles/CardProducto.css';

const CardProducto = ({ producto, agregarAlCarrito }) => {
  const [cantidad, setCantidad] = useState(1);

  // Incrementa respetando el stock
  const incrementar = () => {
    if (cantidad < producto.stock) {
      setCantidad(prev => prev + 1);
    }
  };

  // Decrementa sin bajar de 1
  const decrementar = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

  const handleAgregar = () => {
    if (producto.stock === 0) return; // No permite agregar si no hay stock
    agregarAlCarrito(producto, cantidad);
    setCantidad(1); // Resetea cantidad después de agregar
  };

  return (
    <div className="card-producto">
      <img
        src={producto.image || "/placeholder.png"}
        alt={producto.name}
        className="card-img"
      />
      <div className="card-body">
        <h3 className="card-title">{producto.name}</h3>
        <p className="card-desc">{producto.desc}</p>
        <p className="card-price">${producto.price}</p>
        <p className="card-stock">
          {producto.stock > 0 ? `Stock: ${producto.stock}` : "Sin stock"}
        </p>

        <div className="cantidad-container">
          <button
            className="btn-cant btn-resta"
            onClick={decrementar}
            disabled={producto.stock === 0}
          >
            -
          </button>
          <span className="cantidad">{cantidad}</span>
          <button
            className="btn-cant btn-suma"
            onClick={incrementar}
            disabled={producto.stock === 0 || cantidad >= producto.stock}
          >
            +
          </button>
        </div>

        <button
          className="btn-agregar"
          onClick={handleAgregar}
          disabled={producto.stock === 0}
        >
          {producto.stock === 0 ? "Sin stock" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
};

export default CardProducto;
