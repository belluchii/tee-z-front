import "./load-icon.css";

export default function LoadIcon({
  n = 1,
  width,
  height,
  className,
  cont = true,
}) {
  return cont ? (
    <div className={`ns-skeleton-wrap ${className || ""}`}>
      {[...Array(n)].map((_, i) => (
        <div
          key={i}
          className="ns-skeleton"
          style={{ width: width || "280px", height: height || "340px" }}
        />
      ))}
    </div>
  ) : (
    <>
      {[...Array(n)].map((_, i) => (
        <div
          key={i}
          className="ns-skeleton"
          style={{ width: width || "280px", height: height || "340px" }}
        />
      ))}
    </>
  );
}
