import { getProducts } from "../../services/productServices";
import { useContext, useEffect, useState } from "react";
import { useFetchData } from "../../hooks/fetchData";
import Product from "../../common/Product/Product";
import DataContext from "../../context/context";
import { useLocation, useNavigate } from "react-router-dom";
import "./grid.css";
import { handleFilter } from "../../utils/gridUtils";
import Title from "../../common/Title/Title";

export default function Grid({ arr }) {
  const categorias = ["Aesthetic", "Oversize", "Urban"];
  const navigate = useNavigate();
  const string = new URLSearchParams(useLocation().search).get("string");
  const { data } = useContext(DataContext);
  const [products, setProducts] = useState([]);
  useFetchData({ func: getProducts, set: setProducts });
  useEffect(() => {
    if (arr && !data.email) navigate("/");
  }, [data, navigate, arr]);
  return (
    <>
      <Title
        h2={
          arr
            ? "favoritos"
            : string &&
              categorias.includes(
                string.charAt(0).toUpperCase() + string.slice(1)
              )
            ? string.charAt(0).toUpperCase() + string.slice(1)
            : "productos"
        }
      />
      <div className="cont-grid">
        {products && products.length > 1 ? (
          handleFilter(products, arr, string, data).map((elem, index) => (
            <Product
              name={elem.name}
              price={elem.price}
              src={elem.image}
              key={index}
            />
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </>
  );
}
