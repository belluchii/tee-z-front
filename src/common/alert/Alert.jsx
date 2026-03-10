import { useEffect } from "react";
import "./alert.css";

export default function Alert({ message, onClose, type = "error" }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`alert alert-${type}`}>
      <span className="alert-message">{message}</span>
      <button className="alert-close" onClick={onClose}>
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  );
}
