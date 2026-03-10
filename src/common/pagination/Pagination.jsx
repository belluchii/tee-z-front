import "./pagination.css";

export default function Pagination({ page, setPage, totalPages = 1 }) {
  const getPages = (current, total) => {
    if (total <= 7) return [...Array(total)].map((_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
    if (current >= total - 3)
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        className="pag-btn"
        onClick={() => setPage((p) => p - 1)}
        disabled={page === 1}
      >
        <i className="fa-solid fa-chevron-left" />
      </button>

      {getPages(page, totalPages).map((p, i) =>
        p === "..." ? (
          <span key={i} className="pag-dots">
            ...
          </span>
        ) : (
          <button
            key={i}
            className={`pag-btn ${page === p ? "pag-active" : ""}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ),
      )}

      <button
        className="pag-btn"
        onClick={() => setPage((p) => p + 1)}
        disabled={page === totalPages}
      >
        <i className="fa-solid fa-chevron-right" />
      </button>
    </div>
  );
}
