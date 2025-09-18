import { Link } from "react-router-dom";

const Navbar = ({ carrito }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src="/logo-armonia.png" alt="Logo" className="logo" />
        <span>Armonía del Alma</span>
      </Link>
      <ul className="navbar-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        <li>
          <Link to="/carrito" className="carrito-link">
            🛒
{carrito.length > 0 && (
  <span className="carrito-count">
    {carrito.reduce((total, item) => total + item.cantidad, 0)}
  </span>
)}

          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
