import { useEffect, useState, useRef, useMemo } from "react";
import { getByTag } from "../../services/productServices";
import { useFetchData } from "../../hooks/fetchData";
import Product from "../Product/Product";
import "./swiper.css";
import LoadIcon from "../load-icon/Load-icon";

export default function ProdSwiper({ h2, tag }) {
  const [prods, setProds] = useState([]);
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const timerRef = useRef(null);
  const resetting = useRef(false);

  const params = useMemo(() => ({ tag, page: 1, limit: 7 }), [tag]);

  useFetchData({ func: getByTag, set: setProds, params });

  const slideWidth = window.innerWidth <= 700 ? 160 + 20 : 280 + 20;
  const original = prods?.products || [];
  const items = [...original, ...original, ...original];
  const total = original.length;

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!resetting.current) setIndex((i) => i + 1);
    }, 3000);
  };

  const next = () => {
    if (resetting.current) return;
    setIndex((i) => i + 1);
    startTimer();
  };

  const prev = () => {
    if (resetting.current) return;
    setIndex((i) => i - 1);
    startTimer();
  };

  useEffect(() => {
    if (index >= total * 2) {
      resetting.current = true;
      setTimeout(() => {
        setTransitioning(false);
        setIndex(total);
        setTimeout(() => {
          setTransitioning(true);
          resetting.current = false;
        }, 50);
      }, 400);
    }
    if (index <= 0 && total > 0) {
      resetting.current = true;
      setTimeout(() => {
        setTransitioning(false);
        setIndex(total);
        setTimeout(() => {
          setTransitioning(true);
          resetting.current = false;
        }, 50);
      }, 400);
    }
  }, [index, total]);

  useEffect(() => {
    if (total > 0) {
      setTransitioning(false);
      setIndex(total);
      setTimeout(() => setTransitioning(true), 50);
      startTimer();
    }
    return () => clearInterval(timerRef.current);
  }, [total]);

  return (
    <div className="ns-wrap">
      <h2 className="ns-title shadow">{h2}</h2>

      {original.length === 0 ? (
        <div className="ns-loading">
          <LoadIcon n={6} />
        </div>
      ) : (
        <div className="ns-cont">
          <button className="ns-arrow" onClick={prev}>
            <i className="fa-solid fa-chevron-left" />
          </button>

          <div className="ns-viewport">
            <div
              className="ns-track"
              style={{
                transform: `translateX(-${index * slideWidth}px)`,
                transition: transitioning ? "transform 0.4s ease" : "none",
              }}
            >
              {items.map((elem, i) => (
                <div key={i} className="ns-slide">
                  <Product
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    name={elem.name}
                    price={elem.price}
                    src={elem.image}
                    id={elem._id}
                  />
                </div>
              ))}
            </div>
          </div>

          <button className="ns-arrow" onClick={next}>
            <i className="fa-solid fa-chevron-right" />
          </button>
        </div>
      )}
    </div>
  );
}
