import { Link } from "react-router-dom";
import "./nav.css";
export default function Nav() {
  return (
    <nav>
      <ul>
        <li className="d-none-sm">
          <Link to="/">
            <img src="./z render.webp" alt="z-logo" height={40} />
          </Link>
          <Link to="/categorias">
            <p className="shadow pad-12 d-none-md">Categorias</p>
          </Link>
          <Link to="/products">
            <p className="shadow d-none-md pad-12">Productos</p>
          </Link>
        </li>
        <li>
          <input className="shadow" placeholder="buscar" type="text" />
        </li>
        <li className="d-none-md">
          <Link to="/login">
            <button className="shadow pad-12">Iniciar Sesion</button>
          </Link>
          <Link to="/register">
            <button className="shadow border">Registrarse</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
