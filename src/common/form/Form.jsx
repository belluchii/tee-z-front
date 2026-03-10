import { handleSubmit } from "../../utils/formUtils";
import { useNavigate } from "react-router-dom";
import DataContext from "../../context/context";
import { useContext, useEffect } from "react";
import "./form.css";
import useIsLoading from "../../hooks/useIsLoading";
import useAlert from "../../hooks/useAlert";
import Spinner from "../spinner/Spinner";
import Alert from "../alert/Alert";

export default function Form({ children, button, func }) {
  const navigate = useNavigate();
  const { data, setData } = useContext(DataContext);
  const [isLoading, withLoading] = useIsLoading();
  const { alert, showAlert, closeAlert } = useAlert();

  useEffect(() => {
    if (data.email) navigate("/");
  }, [data, navigate]);

  const handleSumbit = async (event) => {
    let user = await handleSubmit(event, children, (userData) =>
      func(userData, showAlert),
    );
    if (typeof user === "object") {
      setData({
        email: user.data.email,
        favs: user.data.favs,
        cart: user.data.cart,
        history: user.data.history,
      });
    }
  };

  return (
    <div className="form-page">
      <form
        className="cont-form"
        onSubmit={(e) => withLoading(() => handleSumbit(e))}
      >
        <h2 className="form-title shadow">{button}</h2>
        <div className="form-divider" />

        {children.map((elem, i) => (
          <div className="input-parent" key={i}>
            <label className="input-label">{elem.title}</label>
            <input className="input-form" {...elem.props} />
          </div>
        ))}

        <button className="but-form" disabled={isLoading}>
          {isLoading ? <Spinner /> : button}
        </button>
      </form>

      {alert && (
        <Alert message={alert.message} type={alert.type} onClose={closeAlert} />
      )}
    </div>
  );
}
