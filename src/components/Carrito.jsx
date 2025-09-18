import { Link } from "react-router-dom";

const Carrito = ({ carrito, quitarDelCarrito, agregarAlCarrito, vaciarCarrito }) => {
  const total = carrito.reduce((acc, p) => acc + p.price * p.cantidad, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Tu Carrito</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ccc" }}>
                <th style={{ textAlign: "left", padding: "10px" }}>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px" }}>{item.name}</td>
                  <td style={{ textAlign: "center" }}>${item.price}</td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={() => quitarDelCarrito(item.id)}
                      style={{
                        padding: "5px 10px",
                        marginRight: "5px",
                        borderRadius: "5px",
                        border: "none",
                        background: "#ff6b6b",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      ➖
                    </button>
                    {item.cantidad}
                    <button
                      onClick={() => agregarAlCarrito(item, 1)}
                      style={{
                        padding: "5px 10px",
                        marginLeft: "5px",
                        borderRadius: "5px",
                        border: "none",
                        background: "#4caf50",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      ➕
                    </button>
                  </td>
                  <td style={{ textAlign: "center" }}>${item.price * item.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: "20px" }}>Total: ${total}</h3>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button
              onClick={vaciarCarrito}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                background: "#333",
                color: "white",
                cursor: "pointer",
              }}
            >
              🗑 Vaciar Carrito
            </button>

            <Link to="/checkout" style={{ textDecoration: "none" }}>
              <button
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#6a1b9a",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                ✅ Finalizar Compra
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
