import { useRef } from "react";
import "./range-slider.css";

export default function RangeSlider({
  min = 0,
  max = 50000,
  step = 500,
  value,
  onChange,
}) {
  const trackRef = useRef(null);

  const getPercent = (val) => ((val - min) / (max - min)) * 100;

  const getValueFromX = (clientX) => {
    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.min(
      Math.max((clientX - rect.left) / rect.width, 0),
      1,
    );
    const raw = percent * (max - min) + min;
    return Math.round(raw / step) * step;
  };

  const handleMouseDown = (e) => {
    onChange(getValueFromX(e.clientX));
    const onMove = (e) => onChange(getValueFromX(e.clientX));
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const handleTouchStart = () => {
    const onMove = (e) => onChange(getValueFromX(e.touches[0].clientX));
    const onEnd = () => {
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onEnd);
  };

  return (
    <div
      className="rs-track"
      ref={trackRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="rs-fill" style={{ width: `${getPercent(value)}%` }} />
      <div className="rs-thumb" style={{ left: `${getPercent(value)}%` }} />
    </div>
  );
}
