import { getProducts, getTags } from "../../services/productServices";
import {
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import Product from "../../common/Product/Product";
import DataContext from "../../context/context";
import { useLocation, useNavigate } from "react-router-dom";
import "./grid.css";
import Pagination from "../../common/pagination/Pagination";
import Filter from "../../common/Filter/Filter";
import Spinner from "../../common/spinner/Spinner";
import { useFetchData } from "../../hooks/fetchData";
import useIsLoading from "../../hooks/useIsLoading";

export default function Grid({ arr }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { data } = useContext(DataContext);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    categories: [],
    colors: [],
    priceRange: [0, 50000],
  });

  const handleFilter = useCallback((newFilters) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  const [isLoading, withLoading] = useIsLoading(true);
  const debounceRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useFetchData({ func: getTags, set: () => {} });

  const string = useMemo(
    () => new URLSearchParams(location.search).get("string"),
    [location.search],
  );
  const categoryParam = useMemo(
    () => new URLSearchParams(location.search).get("category"),
    [location.search],
  );
  const colorParam = useMemo(
    () => new URLSearchParams(location.search).get("color"),
    [location.search],
  );

  useEffect(() => {
    setFilters({
      categories: categoryParam ? [categoryParam] : [],
      colors: colorParam ? [colorParam] : [],
      priceRange: [0, 50000],
    });
    setPage(1);
  }, [categoryParam, colorParam]);

  useEffect(() => {
    setPage(1);
  }, [string]);

  const { categories: filterCats, colors: filterColors, priceRange } = filters;
  const filtersKey = JSON.stringify({
    filterCats,
    filterColors,
    priceRange,
    string,
    page,
  });

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      withLoading(async () => {
        const res = await getProducts({
          string: string || "",
          categories: filterCats,
          colors: filterColors,
          priceMin: priceRange[0],
          priceMax: priceRange[1],
          page,
          limit: 12,
        });
        if (res?.data) setProducts(res.data);
      });
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [filtersKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (arr && !data.email) navigate("/");
  }, [arr, data.email, navigate]);

  const displayProducts =
    arr && data[arr]
      ? products.products?.filter((p) => data[arr].includes(p.name))
      : products.products;

  const renderContent = () => {
    if (isLoading)
      return (
        <div className="grid-empty">
          <Spinner />;
        </div>
      );
    if (!displayProducts?.length) {
      return (
        <div className="grid-empty">
          <i className="fa-solid fa-box-open" />
          <p>no encontramos productos con esos filtros</p>
        </div>
      );
    }
    return displayProducts.map((elem, index) => (
      <Product
        name={elem.name}
        price={elem.price}
        src={elem.image}
        id={elem._id}
        key={index}
      />
    ));
  };

  return (
    <>
      <div className="grid-layout">
        <Filter onFilter={handleFilter} filters={filters} />
        <div className="cont-grid">{renderContent()}</div>
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={products?.totalPages}
      />
    </>
  );
}
