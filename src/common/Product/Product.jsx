import DataContext from "../../context/context";
import { Link } from "react-router-dom";
import { useContext } from "react";
import "./product.css";
export default function Product({ name, price, src }) {
  const { data, setData } = useContext(DataContext);

  return (
    <>
      <div className="hover-cont">
        <Link to={"/products/" + name}>
          <div className="border cont-product box-shadow">
            <div
              className="product"
              style={{ backgroundImage: `url(${src})` }}
            />
          </div>
        </Link>
        <div className="desc-product">
          <h3 className="h3-product">{name || "producto no encontrado"}</h3>
          {data.favs ? (
            !data.favs.includes(name) ? (
              <button
                className="btn-product"
                onClick={() => setData({ ...data, favs: [...data.favs, name] })}
              >
                ♡
              </button>
            ) : (
              <button
                className="btn-product"
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
            <p className="hidden">a</p>
          )}
          <h3 className="h3-product">${price || 800} </h3>
          <h4 className="h4-product">
            3 cuotas de {Math.floor(price / 3 + (price / 100) * 10) || 300}
          </h4>
        </div>
      </div>
    </>
  );
}
