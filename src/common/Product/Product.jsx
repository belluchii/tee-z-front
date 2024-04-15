import DataContext from "../../context/context";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "./product.css";
export default function Product({ name, price, src }) {
  const { data, setData } = useContext(DataContext);
  const img =
    "https://http2.mlstatic.com/D_NQ_NP_627659-MLA54719189617_032023-O.webp";

  return (
    <>
      <div className="hover-cont">
        <Link to={"/products/" + name}>
          <div className="border cont-product box-shadow">
            <img src={src || img} className="product" alt={name} />
          </div>
        </Link>
        <div className="desc-product">
          <h3>{name || "producto no encontrado"}</h3>
          <h3 className="h3-product">${price || 800}</h3>
          <p>3 cuotas de {Math.floor(price / 3 + (price / 100) * 10) || 300}</p>
        </div>
        {data && data.favs ? (
          !data.favs.includes(name) ? (
            <button
              onClick={() => setData({ ...data, favs: [...data.favs, name] })}
            >
              ♡
            </button>
          ) : (
            <button
              onClick={() =>
                setData({
                  ...data,
                  favs: data.favs.filter((fav) => fav !== name),
                })
              }
            >
              ♥
            </button>
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
}
