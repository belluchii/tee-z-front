import DataContext from "../../context/context";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import "./product.css";

export default function Product({ name, price, src, id, onClick = () => {} }) {
  const { data, setData } = useContext(DataContext);
  const [hovered, setHovered] = useState(false);

  const isFav = data.favs?.includes(id);

  const toggleFav = () => {
    if (!data.favs) return;
    setData({
      ...data,
      favs: isFav ? data.favs.filter((f) => f !== id) : [...data.favs, id],
    });
  };

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={"/products/" + id} className="product-img-wrap">
        <div
          onClick={onClick}
          className="product-img"
          style={{ backgroundImage: `url(${src})` }}
        />
        <div className={`product-overlay ${hovered ? "open" : ""}`}>
          <span className="product-overlay-text">ver producto</span>
        </div>
      </Link>

      <div className="product-info">
        <p className="product-name">{name || "producto no encontrado"}</p>
        <div className="product-pricing">
          <div>
            <p className="product-price">${price || 800}</p>
            <p className="product-installments">
              3 x ${Math.floor(price / 3 + (price / 100) * 10) || 300}
            </p>
          </div>
          {data.favs && (
            <button className="product-fav" onClick={toggleFav}>
              {isFav ? "♥" : "♡"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
