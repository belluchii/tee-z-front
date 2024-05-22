import {
  addCart,
  getStock,
  removeCart,
  removeExcedentCart,
} from "../../utils/cartUtils";
import "./productCard.css";
export default function ProductCard({ elem, data, setData }) {
  return (
    <div className="productCard">
      <img src={elem.image} alt="" width={80} />
      <div className="productCardInfo">
        <h2 className="name-productCard ">{elem.name}</h2>
        <div className="cuantity-productCard">
          <button
            className="btn-productCard"
            onClick={() => removeCart(elem, data, setData)}
          >
            -
          </button>
          {elem.stock < getStock(elem.name, data.cart) &&
            removeExcedentCart(data, elem)}
          <p className="stock-productCard">{getStock(elem.name, data.cart)}x</p>
          <button
            className="btn-productCard"
            onClick={() => addCart(elem, data, setData)}
          >
            +
          </button>
        </div>
        <h3 className="price-productCard">
          {"$" + elem.price * getStock(elem.name, data.cart)}
        </h3>
      </div>
    </div>
  );
}
