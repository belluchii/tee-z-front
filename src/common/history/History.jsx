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
      <div className="history-grid">
        {data.history?.length >= 1 ? (
          products.length === 0 ? (
            <div className="spinner-cont">
              <Spinner />
            </div>
          ) : (
            apilarProductos(data.history).map((elem, index) => {
              const prod = getProduct(elem._id);
              return (
                <div
                  key={index}
                  className="history-card"
                  onClick={() => navigate(`/products/${elem._id}`)}
                >
                  <img
                    className="history-card-img"
                    src={prod?.image}
                    alt={prod?.name}
                  />
                  <div className="history-card-info">
                    <h2 className="history-card-name">{prod?.name}</h2>
                    <p className="history-card-quantity">
                      {elem.stock} unidades
                    </p>
                    <h3 className="history-card-price">
                      ${prod ? elem.stock * prod.price : 0}
                    </h3>
                  </div>
                </div>
              );
            })
          )
        ) : (
          <p className="history-empty">
            <i className="fa-solid fa-bag-shopping" />
            <span>
              {data.email
                ? " aun no realizaste ninguna compra"
                : " logueate para ver tu historial"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
