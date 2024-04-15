import DataContext from "../../context/context";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";

export default function Nav() {
  const navigate = useNavigate();
  const { data, setData } = useContext(DataContext);
  const [value, setValue] = useState("");
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    if (value !== "") navigate("/products?string=" + value);
  }, [value]);

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
          <input
            onChange={(event) => {
              if (event.target.value !== "") setValue(event.target.value);
              else setValue(" ");
            }}
            className="shadow"
            placeholder="buscar"
            type="text"
          />
        </li>
        {data && data.email ? (
          <>
            <li>
              <button
                onClick={() => setDropdown(!dropdown)}
                className="m-center shadow"
              >
                {data.email.split("@")[0].slice(0, 10)}
                <i
                  className={
                    dropdown
                      ? "fa-solid fa-caret-down  fa-2xs shadow  m-arrow reverse"
                      : "fa-solid fa-caret-down  fa-2xs shadow  m-arrow "
                  }
                ></i>
              </button>

              {dropdown ? (
                <div className="dropdown">
                  <p className="shadow">carrito</p>
                  <p className="shadow">historial</p>
                  <Link to="/products/favs" className="shadow">
                    <p>favoritos</p>
                  </Link>
                  <button
                    className="shadow"
                    onClick={() =>
                      setData({ email: null, favs: null, cart: null })
                    }
                  >
                    cerrar sesion
                  </button>
                </div>
              ) : (
                <></>
              )}
            </li>
          </>
        ) : (
          <li className="d-none-md">
            <Link to="/login">
              <button className="shadow pad-12">Iniciar Sesion</button>
            </Link>
            <Link to="/register">
              <button className="shadow border">Registrarse</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
