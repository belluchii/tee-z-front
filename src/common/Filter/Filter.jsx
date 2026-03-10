import { useState, useEffect, useCallback } from "react";
import "./filter.css";
import RangeSlider from "../range-slider/RangeSlider";

const CATEGORIES = [
  "Puffer & Quilted",
  "Trench Coats",
  "Leather & Biker",
  "Denim Jackets",
  "Fleece & Fur",
  "Rain & Wind",
  "Shackets",
  "Parkas",
];

const COLORS = [
  { name: "Black", hex: "#111" },
  { name: "White", hex: "#f5f5f5" },
  { name: "Grey", hex: "#888" },
  { name: "Brown", hex: "#6b3f2a" },
  { name: "Cream", hex: "#f0e6d0" },
  { name: "Beige", hex: "#d4b896" },
  { name: "Camel", hex: "#c19a6b" },
  { name: "Stone", hex: "#b2a99a" },
  { name: "Khaki", hex: "#8b7d5a" },
  { name: "Navy", hex: "#1a2a4a" },
  { name: "Blue", hex: "#3a6bc4" },
  { name: "Green", hex: "#3a7a4a" },
  { name: "Sage", hex: "#8aaa7a" },
  { name: "Pink", hex: "#e8879a" },
  { name: "Lilac", hex: "#b89aca" },
  { name: "Purple", hex: "#6a3a8a" },
  { name: "Red", hex: "#c03030" },
  { name: "Orange", hex: "#d4703a" },
  { name: "Yellow", hex: "#d4b830" },
  { name: "Chocolate", hex: "#3d1f0f" },
];

export default function Filter({ onFilter, filters: externalFilters }) {
  const [openSections, setOpenSections] = useState(["cats", "colors", "price"]);
  const [selectedCats, setSelectedCats] = useState(
    externalFilters?.categories || [],
  );
  const [selectedColors, setSelectedColors] = useState(
    externalFilters?.colors || [],
  );
  const [priceRange, setPriceRange] = useState(
    externalFilters?.priceRange || [0, 50000],
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const externalFiltersKey = JSON.stringify(externalFilters);

  useEffect(() => {
    if (externalFilters) {
      setSelectedCats(externalFilters.categories || []);
      setSelectedColors(externalFilters.colors || []);
      setPriceRange(externalFilters.priceRange || [0, 50000]);
    }
  }, [externalFiltersKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = (section) =>
    setOpenSections(
      openSections.includes(section)
        ? openSections.filter((s) => s !== section)
        : [...openSections, section],
    );

  const toggleCat = useCallback(
    (cat) => {
      setSelectedCats((prev) => {
        const updated = prev.includes(cat)
          ? prev.filter((c) => c !== cat)
          : [...prev, cat];
        onFilter?.({ categories: updated, colors: selectedColors, priceRange });
        return updated;
      });
    },
    [onFilter, selectedColors, priceRange],
  );

  const toggleColor = useCallback(
    (color) => {
      setSelectedColors((prev) => {
        const updated = prev.includes(color)
          ? prev.filter((c) => c !== color)
          : [...prev, color];
        onFilter?.({ categories: selectedCats, colors: updated, priceRange });
        return updated;
      });
    },
    [onFilter, selectedCats, priceRange],
  );

  const handlePrice = useCallback(
    (val, index) => {
      setPriceRange((prev) => {
        const updated = [...prev];
        if (index === 0) {
          updated[0] = Math.min(val, prev[1] - 500);
        } else {
          updated[1] = Math.max(val, prev[0] + 500);
        }
        onFilter?.({
          categories: selectedCats,
          colors: selectedColors,
          priceRange: updated,
        });
        return updated;
      });
    },
    [onFilter, selectedCats, selectedColors],
  );

  const clearAll = useCallback(() => {
    setSelectedCats([]);
    setSelectedColors([]);
    setPriceRange([0, 50000]);
    onFilter?.({ categories: [], colors: [], priceRange: [0, 50000] });
  }, [onFilter]);

  const hasFilters =
    selectedCats.length > 0 ||
    selectedColors.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 50000;

  const filterContent = (
    <div className="filter-inner">
      <div className="filter-header">
        <span className="filter-title">filtros</span>
        {hasFilters && (
          <button className="filter-clear" onClick={clearAll}>
            limpiar
          </button>
        )}
      </div>

      <div className="filter-divider" />

      <div className="filter-section">
        <button className="filter-section-btn" onClick={() => toggle("cats")}>
          <span>categoría</span>
          <i
            className={`fa-solid fa-chevron-${openSections.includes("cats") ? "up" : "down"}`}
          />
        </button>
        {openSections.includes("cats") && (
          <div className="filter-options">
            {CATEGORIES.map((cat, i) => (
              <button
                key={i}
                className={`filter-option ${selectedCats.includes(cat) ? "active" : ""}`}
                onClick={() => toggleCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="filter-divider" />

      <div className="filter-section">
        <button className="filter-section-btn" onClick={() => toggle("colors")}>
          <span>color</span>
          <i
            className={`fa-solid fa-chevron-${openSections.includes("colors") ? "up" : "down"}`}
          />
        </button>
        {openSections.includes("colors") && (
          <div className="filter-options filter-colors">
            {COLORS.map((c, i) => (
              <button
                key={i}
                className={`filter-color-btn ${selectedColors.includes(c.name) ? "active" : ""}`}
                onClick={() => toggleColor(c.name)}
              >
                <span className="filter-swatch" style={{ background: c.hex }} />
                <span className="filter-color-name">{c.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="filter-divider" />

      <div className="filter-section">
        <button className="filter-section-btn" onClick={() => toggle("price")}>
          <span>precio</span>
          <i
            className={`fa-solid fa-chevron-${openSections.includes("price") ? "up" : "down"}`}
          />
        </button>
        {openSections.includes("price") && (
          <div className="filter-price">
            <div className="filter-price-labels">
              <span>${priceRange[0].toLocaleString()}</span>
              <span>${priceRange[1].toLocaleString()}</span>
            </div>
            <div className="filter-range-wrap">
              <RangeSlider
                min={0}
                max={50000}
                step={500}
                value={priceRange[0]}
                onChange={(v) => handlePrice(v, 0)}
              />
            </div>
            <div className="filter-range-wrap">
              <RangeSlider
                min={0}
                max={50000}
                step={500}
                value={priceRange[1]}
                onChange={(v) => handlePrice(v, 1)}
              />
            </div>
          </div>
        )}
      </div>

      <div className="filter-divider" />
    </div>
  );

  return (
    <>
      <div className="filter-wrap">{filterContent}</div>

      <button className="filter-mobile-btn" onClick={() => setMobileOpen(true)}>
        <i className="fa-solid fa-sliders" />
        <span className="filter-span-btn">filtros</span>
        {hasFilters && (
          <div className="filter-mobile-badge">
            <span className="filter-mobile-badge-span">
              {selectedCats.length + selectedColors.length}
            </span>
          </div>
        )}
      </button>

      {mobileOpen && (
        <div className="filter-overlay">
          <div className="filter-overlay-header">
            <button
              className="filter-overlay-close"
              onClick={() => setMobileOpen(false)}
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
          <div className="filter-overlay-body">{filterContent}</div>
          <div className="filter-overlay-footer">
            <button
              className="filter-apply-btn"
              onClick={() => setMobileOpen(false)}
            >
              ver resultados
            </button>
          </div>
        </div>
      )}
    </>
  );
}
