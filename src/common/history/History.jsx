import { useContext, useState } from "react";
import DataContext from "../../context/context";
import { apilarProductos } from "../../utils/historyUtils";
import { useFetchMultipleData } from "../../hooks/fetchData";
import { getOneProduct } from "../../services/productServices";
import Title from "../Title/Title";

export default function History() {
  const { data } = useContext(DataContext);
  const [product, setProduct] = useState([]);
  const arr = [...new Set(data.history)];
  useFetchMultipleData({
    func: getOneProduct,
    set: setProduct,
    arr: arr,
  });
  return (
    <>
      <Title h2={"Historial"} />
      <div className="cont-grid">
        {data.history
          ? apilarProductos(data.history).map((elem, index) => (
              <div key={index} className="productCard w-100">
                <div className="flex">
                  <img
                    className="m-auto"
                    width={80}
                    src={
                      product.length >= 1 &&
                      product
                        .filter((prod) => elem.name === prod.name)[0]
                        .image.toString()
                    }
                    alt={elem.name}
                  />
                </div>

                <div className="productCardInfo">
                  <h2 className="name-productCard">{elem.name}</h2>
                  <div className="cuantity-productCard">
                    <p>{elem.stock}x</p>
                  </div>
                  <h3 className="price-productCard">
                    $
                    {elem.stock *
                      (product.length >= 1 &&
                      product.filter((prod) => elem.name === prod.name)[0]
                        ? product.filter((prod) => elem.name === prod.name)[0]
                            .price
                        : 200)}
                  </h3>
                </div>
              </div>
            ))
          : data.email
          ? "aun no realizaste ninguna compra"
          : "logueate para poder ver tu historial"}
      </div>
    </>
  );
}
