import { useNavigate } from "react-router-dom";
import "./notfound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="nf-wrap">
      <h1 className="nf-code">404</h1>
      <p className="nf-msg">página no encontrada</p>
      <button className="nf-btn" onClick={() => navigate("/")}>
        volver al inicio
      </button>
    </div>
  );
}
