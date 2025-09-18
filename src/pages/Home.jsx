import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config.js";
import CardProducto from "../components/CardProducto";

const Home = ({ agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const productosRef = collection(db, "products"); // tu colección se llama "products"
      const snapshot = await getDocs(productosRef);
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        stock: doc.data().stock || 0, // asegúrate de que exista el stock
      }));
      setProductos(items);
    };
    fetchProductos();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Bienvenido a Armonía 🌸
      </h1>
      <p style={{ textAlign: "center" }}>
        Encuentra los mejores sahumerios para relajarte y llenar tu hogar de paz.
      </p>

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
    </div>
  );
};

export default Home;
