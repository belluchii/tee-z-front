import { useEffect, useCallback } from "react";
import {
  addCart,
  getStock,
  removeCart,
  removeExcedentCart,
} from "../../utils/cartUtils";
import "./productCard.css";

export default function ProductCard({ elem, data, setData, showAlert }) {
  const checkStock = useCallback(() => {
    if (elem.stock < getStock(elem._id, data.cart)) {
      const newData = { ...data, cart: [...data.cart] };
      removeExcedentCart(newData, elem);
      setData(newData);
    }
  }, [elem, data, setData]);

  useEffect(() => {
    checkStock();
  }, [checkStock]);

  return (
    <div className="productCard">
      <img className="productCard-img" src={elem.image} alt={elem.name} />
      <div className="productCardInfo">
        <h2 className="name-productCard">{elem.name}</h2>
        <div className="productCard-bottom">
          <div className="cuantity-productCard">
            <button
              className="btn-productCard"
              onClick={() => removeCart(elem, data, setData)}
            >
              -
            </button>
            <p className="stock-productCard">
              {getStock(elem._id, data.cart)}x
            </p>
            <button
              className="btn-productCard"
              onClick={() => addCart(elem, data, setData, showAlert)}
            >
              +
            </button>
          </div>
          <h3 className="price-productCard">
            ${elem.price * getStock(elem._id, data.cart)}
          </h3>
        </div>
      </div>
    </div>
  );
}
