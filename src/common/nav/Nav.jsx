import DataContext from "../../context/context";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../cart/Cart";
import Alert from "../../common/alert/Alert";
import useAlert from "../../hooks/useAlert";
import "./nav.css";

export default function Navbar({ categories = [] }) {
  const { data, setData } = useContext(DataContext);
  const navigate = useNavigate();
  const { alert, showAlert, closeAlert } = useAlert();
  const [cart, setCart] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [mobileColorOpen, setMobileColorOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const cats =
    categories.length > 0
      ? categories
      : [
          "Puffer & Quilted",
          "Trench Coats",
          "Leather & Biker",
          "Denim Jackets",
          "Fleece & Fur",
          "Rain & Wind",
          "Shackets",
          "Parkas",
        ];

  const colors = [
    { name: "Black", hex: "#111" },
    { name: "White", hex: "#f5f5f5" },
    { name: "Grey", hex: "#888" },
    { name: "Brown", hex: "#6b3f2a" },
    { name: "Cream", hex: "#f0e6d0" },
    { name: "Beige", hex: "#d4b896" },
    { name: "Camel", hex: "#c19a6b" },
    { name: "Stone", hex: "#b2a99a" },
    { name: "Khaki", hex: "#8b7d5a" },
    { name: "Navy", hex: "#1a2a4a" },
    { name: "Blue", hex: "#3a6bc4" },
    { name: "Green", hex: "#3a7a4a" },
    { name: "Sage", hex: "#8aaa7a" },
    { name: "Pink", hex: "#e8879a" },
    { name: "Lilac", hex: "#b89aca" },
    { name: "Purple", hex: "#6a3a8a" },
    { name: "Red", hex: "#c03030" },
    { name: "Orange", hex: "#d4703a" },
    { name: "Yellow", hex: "#d4b830" },
    { name: "Chocolate", hex: "#3d1f0f" },
  ];

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchVal.trim()) {
      navigate(`/products?string=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal("");
      setSearchOpen(false);
    }
  };

  const handleMobileSearch = (e) => {
    if (e.key === "Enter" && searchVal.trim()) {
      navigate(`/products?string=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal("");
      setMobileSearchOpen(false);
      setMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="nav-logo">
            <img src="./z-render.webp" alt="logo" height={40} />
          </Link>

          <div className="nav-center">
            <div
              className="nav-item"
              onMouseEnter={() => setCatOpen(true)}
              onMouseLeave={() => setCatOpen(false)}
            >
              <span className="nav-label">
                categorías{" "}
                <i
                  className="fa-solid fa-chevron-down"
                  style={{ fontSize: "11px", marginLeft: "4px" }}
                />
              </span>
              <div className={`nav-dropdown ${catOpen ? "open" : ""}`}>
                {cats.map((cat, i) => (
                  <Link
                    key={i}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    className="drop-item"
                    onClick={() => setCatOpen(false)}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div
              className="nav-item"
              onMouseEnter={() => setColorOpen(true)}
              onMouseLeave={() => setColorOpen(false)}
            >
              <span className="nav-label">
                colores{" "}
                <i
                  className="fa-solid fa-chevron-down"
                  style={{ fontSize: "11px", marginLeft: "4px" }}
                />
              </span>
              <div
                className={`nav-dropdown color-dropdown ${colorOpen ? "open" : ""}`}
              >
                {colors.map((c, i) => (
                  <Link
                    key={i}
                    to={`/products?color=${encodeURIComponent(c.name)}`}
                    className="color-item"
                    onClick={() => setColorOpen(false)}
                  >
                    <span
                      className="color-swatch"
                      style={{ background: c.hex }}
                    />
                    <span className="color-name">{c.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/products" className="nav-label">
              productos
            </Link>
            <Link to="/products" className="nav-label">
              nuevo
            </Link>
          </div>

          <div className="nav-right">
            <div
              className="nav-item"
              onMouseEnter={() => setSearchOpen(true)}
              onMouseLeave={() => setSearchOpen(false)}
            >
              <i className="search-btn fa-solid fa-magnifying-glass nav-icon" />
              <div
                className={`nav-dropdown search-dropdown ${searchOpen ? "open" : ""}`}
              >
                <input
                  autoFocus={searchOpen}
                  type="text"
                  placeholder="buscar..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  onKeyDown={handleSearch}
                  className="search-overlay-input"
                />
              </div>
            </div>

            {data?.email ? (
              <div className="nav-user nav-item">
                <i className="fa-solid fa-user nav-icon nav-user-btn" />
                <div className="user-menu">
                  <Link to="/products/favs" className="drop-item">
                    favoritos
                  </Link>
                  <Link to="/products/history" className="drop-item">
                    historial
                  </Link>
                  <span
                    className="drop-item"
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
                  </span>
                </div>
              </div>
            ) : (
              <div className="nav-auth">
                <Link to="/login" className="nav-btn login-btn">
                  iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="nav-btn register-btn nav-btn-outline"
                >
                  registrarse
                </Link>
              </div>
            )}

            <i
              className="cart-btn fa-solid fa-cart-plus nav-icon"
              onClick={() => {
                if (data?.email) setCart(true);
                else showAlert("debes loguearte para ver tu carrito");
              }}
            />

            <button
              className="nav-hamburger"
              onClick={() => {
                setMenuOpen(!menuOpen);
                setMobileCatOpen(false);
                setMobileColorOpen(false);
                setMobileSearchOpen(false);
              }}
            >
              <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            <div
              className="mobile-item"
              onClick={() => setMobileSearchOpen(true)}
            >
              <span className="drop-item">buscar</span>
              <i className="fa-solid fa-chevron-right" />
            </div>
            <div className="mobile-item" onClick={() => setMobileCatOpen(true)}>
              <span className="drop-item">categorías</span>
              <i className="fa-solid fa-chevron-right" />
            </div>
            <div
              className="mobile-item"
              onClick={() => setMobileColorOpen(true)}
            >
              <span className="drop-item">colores</span>
              <i className="fa-solid fa-chevron-right" />
            </div>
            <div className="mobile-divider" />
            <Link
              to="/products"
              className="drop-item"
              onClick={() => setMenuOpen(false)}
            >
              productos
            </Link>
            <Link
              to="/products"
              className="drop-item"
              onClick={() => setMenuOpen(false)}
            >
              nuevo
            </Link>
            <div className="mobile-divider" />
            {data?.email ? (
              <>
                <Link
                  to="/products/favs"
                  className="drop-item"
                  onClick={() => setMenuOpen(false)}
                >
                  favoritos
                </Link>
                <Link
                  to="/products/history"
                  className="drop-item"
                  onClick={() => setMenuOpen(false)}
                >
                  historial
                </Link>
                <span
                  className="drop-item"
                  onClick={() => {
                    setData({
                      cart: null,
                      email: null,
                      favs: null,
                      history: null,
                    });
                    setMenuOpen(false);
                  }}
                >
                  salir
                </span>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="drop-item"
                  onClick={() => setMenuOpen(false)}
                >
                  iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="drop-item"
                  onClick={() => setMenuOpen(false)}
                >
                  registrarse
                </Link>
              </>
            )}
            <div className="mobile-divider" />
            <span
              className="drop-item"
              onClick={() => {
                if (data?.email) {
                  setCart(true);
                  setMenuOpen(false);
                } else showAlert("debes loguearte para ver tu carrito");
              }}
            >
              carrito
            </span>
          </div>
        )}

        {mobileSearchOpen && (
          <div className="mobile-menu">
            <div
              className="mobile-back"
              onClick={() => setMobileSearchOpen(false)}
            >
              <i className="fa-solid fa-chevron-left" />
              <span className="drop-item">buscar</span>
            </div>
            <div className="mobile-divider" />
            <input
              autoFocus
              type="text"
              placeholder="buscar..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              onKeyDown={handleMobileSearch}
              className="mobile-search-input"
            />
          </div>
        )}

        {mobileCatOpen && (
          <div className="mobile-menu">
            <div
              className="mobile-back"
              onClick={() => setMobileCatOpen(false)}
            >
              <i className="fa-solid fa-chevron-left" />
              <span className="drop-item">categorías</span>
            </div>
            <div className="mobile-divider" />
            {cats.map((cat, i) => (
              <Link
                key={i}
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="drop-item"
                onClick={() => {
                  setMobileCatOpen(false);
                  setMenuOpen(false);
                }}
              >
                {cat}
              </Link>
            ))}
          </div>
        )}

        {mobileColorOpen && (
          <div className="mobile-menu">
            <div
              className="mobile-back"
              onClick={() => setMobileColorOpen(false)}
            >
              <i className="fa-solid fa-chevron-left" />
              <span className="drop-item">colores</span>
            </div>
            <div className="mobile-divider" />
            {colors.map((c, i) => (
              <Link
                key={i}
                to={`/products?color=${encodeURIComponent(c.name)}`}
                className="color-item"
                onClick={() => {
                  setMobileColorOpen(false);
                  setMenuOpen(false);
                }}
              >
                <span className="color-swatch" style={{ background: c.hex }} />
                <span className="color-name">{c.name}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>

      {alert && (
        <Alert message={alert.message} type={alert.type} onClose={closeAlert} />
      )}

      {data?.email && <Cart setCart={setCart} cart={cart} />}
    </>
  );
}
