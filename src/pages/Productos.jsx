import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config.js";
import CardProducto from "../components/CardProducto";

const Productos = ({ agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const productosRef = collection(db, "products");
      const snapshot = await getDocs(productosRef);
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        stock: doc.data().stock || 0, // aseguramos que haya stock
      }));
      setProductos(items);
    };
    fetchProductos();
  }, []);

  return (
    <div className="productos-grid">
      {productos.map(producto => (
        <CardProducto
          key={producto.id}
          producto={producto}
          agregarAlCarrito={agregarAlCarrito}
          stock={producto.stock} // pasamos el stock
        />
      ))}
    </div>
  );
};

export default Productos;
