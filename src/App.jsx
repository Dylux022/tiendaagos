import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Carrito from "./components/Carrito";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Checkout from "./pages/Checkout";
import Gracias from "./pages/Gracias";

function App() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const exist = prev.find((p) => p.id === producto.id);
      if (exist) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + cantidad }
            : p
        );
      } else {
        return [...prev, { ...producto, cantidad }];
      }
    });

    toast.success(`${cantidad} x ${producto.name} agregado al carrito!`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const quitarDelCarrito = (id) => {
    setCarrito((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <>
      <Navbar carrito={carrito} />
      <Routes>
        <Route path="/checkout" element={<Checkout carrito={carrito} vaciarCarrito={vaciarCarrito} />} />
        <Route path="/gracias" element={<Gracias />} />

        <Route
          path="/"
          element={<Home agregarAlCarrito={agregarAlCarrito} />}
        />
        <Route
          path="/productos"
          element={<Productos agregarAlCarrito={agregarAlCarrito} />}
        />
        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              quitarDelCarrito={quitarDelCarrito}
              agregarAlCarrito={agregarAlCarrito}
              vaciarCarrito={vaciarCarrito}
            />
          }
        />
      </Routes>
      <Footer />
      <ToastContainer /> {/* Contenedor de los toasts */}
    </>
  );
}

export default App;
