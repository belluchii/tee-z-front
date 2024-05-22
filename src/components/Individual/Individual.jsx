import { getOneProduct } from "../../services/productServices";
import { handleAddToCart } from "../../utils/individualUtils";
import { useFetchData } from "../../hooks/fetchData";
import { usePutData } from "../../hooks/putData";
import Footer from "../../common/footer/Footer";
import DataContext from "../../context/context";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import "./Individual.css";
import Title from "../../common/Title/Title";
import ProdSwiper from "../../common/prodswiper/ProdSwiper";

export default function Individual() {
  const { data, setData } = useContext(DataContext);
  const [product, setProduct] = useState([]);
  const { name } = useParams();
  useFetchData({
    func: getOneProduct,
    set: setProduct,
    state: product,
    params: name,
  });

  usePutData({ data: data, setData: setData, email: data.email });

  return (
    <>
      <Title h2={""} />
      <div className="individual">
        <div className="product-img-individual">
          <div className="imgs-cont-individual">
            <div />
            <div className="left-zoom" />
            <div className="right-zoom" />
          </div>
          <img src={product.image} className="product-individual" />
        </div>
        <form className="info-individual">
          <h2 className="text-center">
            {product.name || "Nombre de la remera"}
          </h2>
          <div className="elem-individual">
            ${product.price || "Precio de la remera"}
            <p className="cuotas-individual">
              3 cuotas de $
              {Math.floor(product.price / 3 + (product.price / 100) * 3) || 300}
            </p>
          </div>
          <div className="elem-individual">
            <div>
              <h3 htmlFor="colores">color</h3>
              {product && product.color ? <p>{product.color}</p> : ""}
            </div>
            <p></p>
          </div>

          <button
            onClick={(e) => handleAddToCart(e, product, data, setData)}
            className="border btn-individual"
          >
            agregar al carrito
          </button>

          <p className="desc-individual ">
            {(product && product.description) || "Descripcion de la remera"}
          </p>
        </form>
      </div>

      <ProdSwiper
        h2={"Otros productos"}
        tag={
          product && product.tags && product.tags[0] === "Oversize"
            ? "Urban"
            : "Oversize"
        }
      />
      <Footer />
    </>
  );
}
/*
        
*/
