import { getByTag } from "../../services/productServices";
import { useFetchData } from "../../hooks/fetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import "./swiper.css";
import "swiper/css";
import { Link } from "react-router-dom";

export default function ProdSwiper({ h2, tag }) {
  const [prods, setProds] = useState([]);
  useFetchData({ func: getByTag, set: setProds, params: tag });

  const [width, setWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <h2 className="text-center shadow title-swiper">{h2}</h2>
      <Swiper
        centeredSlides={true}
        className="swiper "
        slidesPerView={width > 1000 ? 3 : 2}
        spaceBetween={30}
        autoplay={true}
        loop={true}
        modules={[Autoplay]}
      >
        {prods &&
          prods.length &&
          prods.map((elem, index) => (
            <SwiperSlide key={index}>
              <Link to={"/products/" + elem.name}>
                <div
                  className="img-swiper"
                  style={{ backgroundImage: `url(${elem.image})` }}
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
