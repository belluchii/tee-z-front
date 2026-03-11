import { Link } from "react-router-dom";
import LoadIcon from "../load-icon/Load-icon";
import "./home-sections.css";

export default function HomeSections() {
  const categories = [
    {
      label: "Puffer & Quilted",
      slug: "puffer",
      img: "https://images.asos-media.com/products/asos-design-rubberised-bomber-rain-jacket-in-khaki/203658411-4?$n_1920w$&wid=1926&fit=constrain",
    },
    {
      label: "Trench Coats",
      slug: "trench",
      img: "https://images.asos-media.com/products/new-look-trench-coat-in-camel/204351106-4?$n_1920w$&wid=1926&fit=constrain",
    },
    {
      label: "Leather & Biker",
      slug: "leather",
      img: "https://images.asos-media.com/products/asos-design-tall-ultimate-faux-leather-biker-jacket-in-black/204066187-4?$n_1920w$&wid=1926&fit=constrain",
    },
    {
      label: "Fleece & Fur",
      slug: "fleece",
      img: "https://images.asos-media.com/products/stradivarius-double-breasted-wool-coat-in-grey/203958042-4?$n_1920w$&wid=1926&fit=constrain",
    },
  ];

  const benefits = [
    {
      icon: "fa-truck",
      title: "envío gratis",
      desc: "en compras superiores a $50.000",
    },
    {
      icon: "fa-rotate-left",
      title: "devoluciones",
      desc: "30 días para cambios sin costo",
    },
    {
      icon: "fa-credit-card",
      title: "3 cuotas",
      desc: "sin interés en todos los productos",
    },
    {
      icon: "fa-lock",
      title: "pago seguro",
      desc: "tus datos siempre protegidos",
    },
  ];

  const colors = [
    { label: "Black", hex: "#111", slug: "black" },
    { label: "White", hex: "#f5f5f5", slug: "white" },
    { label: "Brown", hex: "#6b3f2a", slug: "brown" },
    { label: "Cream", hex: "#f0e6d0", slug: "cream" },
    { label: "Beige", hex: "#d4b896", slug: "beige" },
    { label: "Camel", hex: "#c19a6b", slug: "camel" },
    { label: "Navy", hex: "#1a2a4a", slug: "navy" },
    { label: "Blue", hex: "#3a6bc4", slug: "blue" },
    { label: "Green", hex: "#3a7a4a", slug: "green" },
    { label: "Pink", hex: "#e8879a", slug: "pink" },
    { label: "Purple", hex: "#6a3a8a", slug: "purple" },
    { label: "Red", hex: "#c03030", slug: "red" },
  ];

  return (
    <main className="hs-wrap">
      {/* BANNERS DOBLES */}
      <div className="hs-banners">
        <Link to="/products?string=trench" className="hs-banner">
          <LoadIcon
            n={1}
            width="100%"
            height="100%"
            className="hs-banner-load"
          />
          <div
            className="hs-banner-img"
            style={{
              backgroundImage: `url(https://images.asos-media.com/products/vero-moda-parka-coat-in-brown/203444141-4?$n_1920w$&wid=1926&fit=constrain)`,
            }}
          />
          <div className="hs-banner-label">
            <span>Parkas</span>
            <i className="fa-solid fa-arrow-right" />
          </div>
        </Link>
        <Link to="/products?string=leather" className="hs-banner">
          <LoadIcon
            n={1}
            width="100%"
            height="100%"
            className="hs-banner-load"
          />
          <div
            className="hs-banner-img"
            style={{
              backgroundImage: `url(https://images.asos-media.com/products/asos-design-tall-ultimate-faux-leather-biker-jacket-in-black/204066187-4?$n_1920w$&wid=1926&fit=constrain)`,
            }}
          />
          <div className="hs-banner-label">
            <span>shackets</span>
            <i className="fa-solid fa-arrow-right" />
          </div>
        </Link>
      </div>

      {/* CATEGORIAS */}
      <div className="hs-section">
        <h2 className="hs-title shadow">categorías</h2>
        <div className="hs-cats">
          {categories.map((c, i) => (
            <Link key={i} to={`/products?string=${c.slug}`} className="hs-cat">
              <div className="hs-cat-img-wrap">
                <LoadIcon n={1} width="100%" height="320px" />
                <div
                  className="hs-cat-img"
                  style={{ backgroundImage: `url(${c.img})` }}
                />
              </div>
              <p className="hs-cat-label">{c.label}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* BENEFICIOS */}
      <div className="hs-benefits">
        {benefits.map((b, i) => (
          <div key={i} className="hs-benefit">
            <i className={`fa-solid ${b.icon} hs-benefit-icon`} />
            <h4 className="hs-benefit-title">{b.title}</h4>
            <p className="hs-benefit-desc">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* COLORES */}
      <div className="hs-section">
        <h2 className="hs-title shadow">colores</h2>
        <div className="hs-cats">
          {colors.map((c, i) => (
            <Link
              key={i}
              to={`/products?string=${c.slug}`}
              className="hs-color"
            >
              <div className="hs-color-swatch" style={{ background: c.hex }} />
              <p className="hs-cat-label">{c.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
