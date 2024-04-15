import { getProducts } from "../../services/productServices";
import { useContext, useEffect, useState } from "react";
import { useFetchData } from "../../hooks/fetchData";
import Product from "../../common/Product/Product";
import DataContext from "../../context/context";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./grid.css";
import { usePutData } from "../../hooks/putData";

export default function Grid({ favs }) {
  const string = new URLSearchParams(useLocation().search).get("string");
  const { data, setData } = useContext(DataContext);
  const [products, setProducts] = useState([]);
  useFetchData({ func: getProducts, set: setProducts });
  usePutData({ data: data, setData: setData, email: data.email });

  return (
    <div className="cont-grid">
      {products && products.length > 1 ? (
        products
          .filter((elem) => {
            if (!favs) return elem.name.includes(string || "");
            else return data.favs.includes(elem.name);
          })
          .map((elem, index) => (
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
  );
}
