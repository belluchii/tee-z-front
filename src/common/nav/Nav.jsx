import DataContext from "../../context/context";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";
import Cart from "../cart/Cart";
import { usePutData } from "../../hooks/putData";
import Dropdown from "../dropdown/Dropdown";

export default function Nav() {
  const navigate = useNavigate();
  const { data, setData } = useContext(DataContext);
  const [cart, setCart] = useState(false);
  const [value, setValue] = useState("");
  usePutData({ data: data, setData: setData });

  useEffect(() => {
    if (value !== "") navigate("/products?string=" + value);
  }, [value, navigate]);

  return (
    <>
      <nav>
        <ul className="ul-nav">
          <li>
            <Dropdown
              dropTarget={
                <i className="fa-solid fa-magnifying-glass shadow cursor" />
              }
              children={
                <>
                  <p></p>
                  <input
                    type="text"
                    onBlur={() => setValue("")}
                    onChange={(e) => setValue(e.target.value)}
                    className="dropdown-input cursor"
                  />
                </>
              }
            />
          </li>
          <li>
            <Dropdown
              dropTarget={<i className="fa-solid fa-shirt shadow" />}
              children={
                <>
                  <Dropdown
                    dropTarget={<h2 className="shadow cursor">categorias</h2>}
                    children={
                      <>
                        <h2
                          className="shadow cursor"
                          onClick={() => {
                            if (value === "Oversize") setValue("oversize");
                            else setValue("Oversize");
                          }}
                          onBlur={() => setValue("")}
                        >
                          Oversize
                        </h2>

                        <h2
                          className="shadow cursor"
                          onClick={() => {
                            if (value === "Urban") setValue("urban");
                            else setValue("Urban");
                          }}
                          onBlur={() => setValue("")}
                        >
                          Urban
                        </h2>
                        <h2
                          className="shadow cursor"
                          onClick={() => {
                            if (value === "Aesthetic") setValue("aesthetic");
                            else setValue("Aesthetic");
                          }}
                          onBlur={() => setValue("")}
                        >
                          Aesthetic
                        </h2>
                      </>
                    }
                  />
                  <Link to={"/products"}>
                    <h2 className="shadow cursor">productos</h2>
                  </Link>
                </>
              }
            />
          </li>
          <li>
            <Link to={"/"}>
              <img src="./z-render.webp" alt="z-logo" height={40} />
            </Link>
          </li>

          <li>
            <Dropdown
              dropTarget={<i className="fa-solid fa-user shadow"></i>}
              children={
                <>
                  {data.email ? (
                    <>
                      <Link to={"/products/favs"}>
                        <h2 className="shadow cursor">favoritos</h2>
                      </Link>
                      <Link to={"/products/history"}>
                        <h2 className="shadow cursor">historial</h2>
                      </Link>
                      <h2
                        className="shadow cursor"
                        onClick={() =>
                          setData({
                            cart: null,
                            email: null,
                            favs: null,
                            history: null,
                          })
                        }
                      >
                        salir
                      </h2>
                    </>
                  ) : (
                    <>
                      <Link to={"/login"}>
                        <h2
                          onClick={() => setValue("")}
                          className="shadow cursor"
                        >
                          iniciar sesion
                        </h2>
                      </Link>
                      <Link to={"/register"}>
                        <h2
                          onClick={() => setValue("")}
                          className="shadow cursor"
                        >
                          registrarse
                        </h2>
                      </Link>
                    </>
                  )}
                </>
              }
            />
          </li>
          <li>
            <i
              className="fa-solid fa-cart-plus shadow cursor"
              onClick={() => {
                if (data.email) setCart(true);
                else alert("debes loguearte para ver tu carrito");
              }}
            ></i>
          </li>
        </ul>
      </nav>
      {data.email && <Cart setCart={setCart} cart={cart} />}
    </>
  );
}
