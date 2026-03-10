import { getOneProduct } from "../../services/productServices";
import { handleAddToCart } from "../../utils/individualUtils";
import { useFetchData } from "../../hooks/fetchData";
import { usePutData } from "../../hooks/putData";
import DataContext from "../../context/context";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useCallback } from "react";
import "./Individual.css";
import ProdSwiper from "../../common/prodswiper/ProdSwiper";
import LoadIcon from "../../common/load-icon/Load-icon";
import useAlert from "../../hooks/useAlert";
import Alert from "../../common/alert/Alert";

export default function Individual() {
  const { data, setData } = useContext(DataContext);
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { alert, showAlert, closeAlert } = useAlert();

  useFetchData({
    func: getOneProduct,
    set: setProduct,
    params: id,
  });

  const refetch = useCallback(async () => {
    const res = await getOneProduct(id);
    if (res?.data) setProduct(res.data);
  }, [id]);

  useEffect(() => {
    refetch();
  }, [refetch, data.cart]);

  usePutData({ data, setData, email: data.email });

  const isFav = data.favs?.includes(product.name);

  const toggleFav = () => {
    if (!data.favs) return;
    setData({
      ...data,
      favs: isFav
        ? data.favs.filter((f) => f !== product.name)
        : [...data.favs, product.name],
    });
  };

  return (
    <>
      {!product.image ? (
        <div className="ind-page">
          <div className="ind-layout">
            <div className="ind-img-wrap">
              <LoadIcon n={1} width="100%" height="900px" />
            </div>
            <div className="ind-info">
              <LoadIcon n={1} width="60%" height="20px" />
              <LoadIcon n={1} width="100%" height="32px" />
              <LoadIcon n={1} width="40%" height="24px" />
              <LoadIcon n={1} width="100%" height="1px" />
              <LoadIcon n={1} width="80%" height="16px" />
              <LoadIcon n={1} width="100%" height="48px" />
            </div>
          </div>
        </div>
      ) : (
        <div className="ind-page">
          <button className="ind-back" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-chevron-left" />
            <span>volver</span>
          </button>

          <div className="ind-layout">
            <div className="ind-img-wrap">
              <img src={product.image} alt={product.name} className="ind-img" />
            </div>

            <div className="ind-info">
              <p className="ind-tag">{product.tags?.[0]}</p>
              <h1 className="ind-name">{product.name}</h1>

              <div className="ind-price-wrap">
                <p className="ind-price">${product.price}</p>
                <p className="ind-installments">
                  3 x $
                  {Math.floor(product.price / 3 + (product.price / 100) * 3)}
                </p>
              </div>

              <div className="ind-divider" />

              <div className="ind-meta">
                <div className="ind-meta-item">
                  <span className="ind-meta-label">color</span>
                  <span className="ind-meta-value">{product.color}</span>
                </div>
                {product.size?.length > 0 && (
                  <div className="ind-meta-item">
                    <span className="ind-meta-label">tallas</span>
                    <div className="ind-sizes">
                      {product.size.map((s, i) => (
                        <span key={i} className="ind-size">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="ind-divider" />

              <div className="ind-actions">
                <button
                  className="ind-btn-cart"
                  onClick={(e) =>
                    handleAddToCart(e, product, data, setData, showAlert)
                  }
                  disabled={product.stock <= 0}
                >
                  {product.stock <= 0 ? "sin stock" : "agregar al carrito"}
                </button>
                {data.favs && (
                  <button className="ind-btn-fav" onClick={toggleFav}>
                    {isFav ? "♥" : "♡"}
                  </button>
                )}
              </div>

              <p className="ind-desc">{product.description}</p>
            </div>
          </div>
        </div>
      )}

      <ProdSwiper h2="Productos Recomendados" tag="Parkas" />

      {alert && (
        <Alert message={alert.message} type={alert.type} onClose={closeAlert} />
      )}
    </>
  );
}
