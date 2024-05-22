import { useNavigate } from "react-router-dom";
import "./title.css";
export default function Title({ h2 }) {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="title shadow">
        <i
          onClick={() => navigate(-1)}
          className="cursor span-Title fa-solid fa-circle-left"
        ></i>

        {h2}
      </h2>
    </>
  );
}
