import { useContext, useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Product from "../../common/Product/Product";
import DataContext from "../../context/context";
import { getOneProduct } from "../../services/productServices";
import { useFetchMultipleData } from "../../hooks/fetchData";
import Spinner from "../../common/spinner/Spinner";
import Pagination from "../../common/pagination/Pagination";
import Filter from "../../common/Filter/Filter";
import "../Grid/grid.css";

const LIMIT = 12;

export default function FavsGrid() {
  const navigate = useNavigate();
  const { data } = useContext(DataContext);
  const [products, setProducts] = useState([]);
  const [snapshot, setSnapshot] = useState([]);
  const [frozenIds, setFrozenIds] = useState(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    categories: [],
    colors: [],
    priceRange: [0, 50000],
  });

  const handleFilter = useCallback((f) => {
    setFilters(f);
    setPage(1);
  }, []);

  useEffect(() => {
    if (!data.email) navigate("/");
  }, [data.email, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const uniqueFavIds = useMemo(
    () => [...new Set(data.favs || [])],
    [data.favs],
  );

  useEffect(() => {
    if (frozenIds === null && uniqueFavIds.length > 0) {
      setFrozenIds(uniqueFavIds);
    }
  }, [uniqueFavIds]); // eslint-disable-line react-hooks/exhaustive-deps

  useFetchMultipleData({
    func: getOneProduct,
    set: (prods) => {
      setProducts(prods);
      setSnapshot(prods);
    },
    arr: frozenIds || [],
  });

  const isLoading = uniqueFavIds.length > 0 && products.length === 0;

  const filteredProducts = useMemo(() => {
    return snapshot.filter((p) => {
      const matchCategory =
        filters.categories.length === 0 ||
        filters.categories.some((c) => p.tags?.includes(c));
      const matchColor =
        filters.colors.length === 0 || filters.colors.includes(p.color);
      const matchPrice =
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
      return matchCategory && matchColor && matchPrice;
    });
  }, [snapshot, filters]);

  const totalPages = Math.ceil(filteredProducts.length / LIMIT);
  const displayProducts = filteredProducts.slice(
    (page - 1) * LIMIT,
    page * LIMIT,
  );

  const renderContent = () => {
    if (isLoading)
      return (
        <div className="grid-empty">
          <Spinner />
        </div>
      );
    if (!displayProducts?.length)
      return (
        <div className="grid-empty">
          <i className="fa-solid fa-heart" />
          <p>
            {data.email
              ? "no se encontraron favoritos"
              : "logueate para ver tus favoritos"}
          </p>
        </div>
      );
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
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </>
  );
}
