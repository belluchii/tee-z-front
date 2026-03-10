import { useContext, useState, useMemo } from "react";
import DataContext from "../../context/context";
import { useFetchMultipleData } from "../../hooks/fetchData";
import { getOneProduct, reduceProduct } from "../../services/productServices";
import "./cart.css";
import { buyCart, getStock, getTotal } from "../../utils/cartUtils";
import ProductCard from "../ProductCard/ProductCard";
import useAlert from "../../hooks/useAlert";
import Alert from "../../common/alert/Alert";

export default function Cart({ setCart, cart }) {
  const { data, setData } = useContext(DataContext);
  const [products, setProducts] = useState([]);
  const { alert, showAlert, closeAlert } = useAlert();

  const uniqueCartIds = useMemo(() => [...new Set(data.cart)], [data.cart]);

  useFetchMultipleData({
    func: getOneProduct,
    set: setProducts,
    arr: uniqueCartIds,
  });

  return (
    <aside className={"cart cart-" + cart}>
      <div className="cart-header">
        <h2 className="cart-title">carrito</h2>
        <button className="cart-close" onClick={() => setCart(false)}>
          <i className="fa-solid fa-xmark" />
        </button>
      </div>

      <div className="cart-divider" />

      <div className="cart-items">
        {products.length && data.cart.length >= 1 ? (
          products.map((elem, i) =>
            getStock(elem._id, data.cart) >= 1 ? (
              <ProductCard
                elem={elem}
                data={data}
                setData={setData}
                showAlert={showAlert}
                key={i}
              />
            ) : null,
          )
        ) : (
          <div className="cart-empty">
            <i className="fa-solid fa-bag-shopping" />
            <p>carrito vacío</p>
          </div>
        )}
      </div>

      <div className="cart-footer">
        <div className="cart-divider" />
        <div className="cart-total">
          <span className="cart-total-label">total</span>
          <span className="cart-total-price">
            ${products && getTotal(products, data.cart)}
          </span>
        </div>
        <button
          className="cart-buy-btn"
          onClick={() =>
            buyCart(data, setData, products, reduceProduct, showAlert)
          }
        >
          realizar compra
        </button>
      </div>

      {alert && (
        <Alert message={alert.message} type={alert.type} onClose={closeAlert} />
      )}
    </aside>
  );
}
