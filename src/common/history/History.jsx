import { useContext, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/context";
import { apilarProductos } from "../../utils/historyUtils";
import { useFetchMultipleData } from "../../hooks/fetchData";
import { getOneProduct } from "../../services/productServices";
import Spinner from "../spinner/Spinner";
import "./history.css";

export default function History() {
  const { data } = useContext(DataContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const uniqueHistoryIds = useMemo(
    () => [...new Set(data.history)],
    [data.history],
  );

  useFetchMultipleData({
    func: getOneProduct,
    set: setProducts,
    arr: uniqueHistoryIds,
  });

  const getProduct = (id) => products.find((prod) => prod._id === id);

  return (
    <div className="history-wrapper">
      <h2 className="history-title">Historial</h2>
      {data.history?.length >= 1 ? (
        products.length === 0 ? (
          <div className="spinner-cont">
            <Spinner />
          </div>
        ) : (
          <div className="history-list">
            {apilarProductos(data.history).map((elem, index) => {
              const prod = getProduct(elem._id);
              return (
                <div
                  key={index}
                  className="history-row"
                  onClick={() => navigate(`/products/${elem._id}`)}
                >
                  <span className="history-row-index">{index + 1}</span>
                  <img
                    className="history-row-img"
                    src={prod?.image}
                    alt={prod?.name}
                  />
                  <p className="history-row-name">{prod?.name}</p>
                  <p className="history-row-qty">{elem.stock} u.</p>
                  <p className="history-row-price">
                    ${prod ? elem.stock * prod.price : 0}
                  </p>
                  <div className="history-row-bottom">
                    <p className="history-row-price">
                      ${prod ? elem.stock * prod.price : 0}
                    </p>
                    <p className="history-row-qty">{elem.stock} u.</p>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <p className="history-empty">
          <i className="fa-solid fa-bag-shopping" />
          <span>
            {data.email
              ? "aun no realizaste ninguna compra"
              : "logueate para ver tu historial"}
          </span>
        </p>
      )}
    </div>
  );
}
