import { getOneProduct } from "../../services/productServices";
import { useFetchData } from "../../hooks/fetchData";
import { usePutData } from "../../hooks/putData";
import Footer from "../../common/footer/Footer";
import DataContext from "../../context/context";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import "./Individual.css";

export default function Individual() {
  const { data, setData } = useContext(DataContext);
  const [product, setProduct] = useState([]);
  const [stock, setStock] = useState(1);
  const { name } = useParams();

  useFetchData({
    func: getOneProduct,
    set: setProduct,
    params: name,
  });
  usePutData({ data: data, setData: setData, email: data.email });

  return (
    <>
      <div className="cont-product-individual ">
        <img
          src={product ? product.image : img}
          className="product-individual"
        />
        <form className="desc-individual">
          <h2>{product.name || "Nombre de la remera"}</h2>
          <h3>${product.price || "Precio de la remera"}</h3>
          <h3>
            3 cuotas de $
            {Math.floor(product.price / 3 + (product.price / 100) * 3) || 300}
          </h3>
          <div className="selects-cont-individual">
            <div className="select-cont-individual">
              <h3 htmlFor="colores">color</h3>
              {product && product.color ? <p>{product.color}</p> : ""}
            </div>
            <div className="select-cont-individual">
              <label htmlFor="talles">talles</label>
              <select id="talles">
                {product && product.size
                  ? product.size.map((size, i) => (
                      <option key={i} value={size}>
                        {size}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
          </div>
          <div>
            <input
              onChange={(e) => setStock(parseInt(e.target.value))}
              type="number"
              className="input-number-individual"
              defaultValue={stock}
              max={product.stock || 20}
              min={1}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                if (data && data.email) {
                  setData({
                    ...data,
                    cart: data.cart.concat(
                      Array(parseInt(stock)).fill(product.name)
                    ),
                  });
                  alert("se ha agregado al carrito");
                } else alert("debes loguearte para poder hacer compras");
              }}
              className="border"
            >
              agregar al carrito
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

const img =
  "https://http2.mlstatic.com/D_NQ_NP_627659-MLA54719189617_032023-O.webp";
