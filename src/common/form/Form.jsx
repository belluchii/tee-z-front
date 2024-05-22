import { handleSubmit } from "../../utils/formUtils";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/context";
import { useContext, useEffect } from "react";
import "./form.css";
import Title from "../Title/Title";

export default function Form({ children, button, func }) {
  const navigate = useNavigate();
  const { data, setData } = useContext(DataContext);

  useEffect(() => {
    if (data.email) {
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <>
      <form
        className="cont-form"
        onSubmit={async (event) => {
          let user = await handleSubmit(event, children, func);
          if (typeof user === "object") {
            setData({
              email: user.data.email,
              favs: user.data.favs,
              cart: user.data.cart,
              history: user.data.history,
            });
          }
        }}
      >
        {children.map((elem, i) => (
          <div className="input-parent" key={i}>
            {i === 0 ? <Title h2="" /> : ""}
            <h3 className="shadow h3-form">{elem.title}</h3>
            <input className="input-form" {...elem.props} />
          </div>
        ))}
        <button className="but-form shadow">{button}</button>
      </form>
    </>
  );
}
