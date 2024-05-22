import { useContext, useState } from "react";
import DataContext from "../../context/context";
import { useFetchMultipleData } from "../../hooks/fetchData";
import { getOneProduct, reduceProduct } from "../../services/productServices";
import "./cart.css";
import { buyCart, getStock, getTotal } from "../../utils/cartUtils";
import ProductCard from "../ProductCard/ProductCard";

export default function Cart({ setCart, cart }) {
  const { data, setData } = useContext(DataContext);
  const [products, setProducts] = useState([]);
  useFetchMultipleData({
    func: getOneProduct,
    set: setProducts,
    arr: [...new Set(data.cart)],
  });

  return (
    <aside className={"cart cart-" + cart}>
      <button className="btn-cart " onClick={() => setCart(false)}>
        {"-------->"}
      </button>

      {products.length && data.cart.length >= 1 ? (
        products.map((elem, i) =>
          getStock(elem.name, data.cart) >= 1 ? (
            <ProductCard elem={elem} data={data} setData={setData} key={i} />
          ) : (
            ""
          )
        )
      ) : (
        <h2 className="text-center">carrito vacio</h2>
      )}
      <h2 className="total-cart">
        total: ${products && getTotal(products, data.cart)}
      </h2>
      <button
        className="btn-cart"
        onClick={() => {
          buyCart(data, setData, products, reduceProduct);
        }}
      >
        Realizar compra
      </button>
    </aside>
  );
}
