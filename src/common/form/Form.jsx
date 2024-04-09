import { handleSubmit } from "../../utils/formUtils";
import "./form.css";

export default function Form({ children, button, func }) {
  return (
    <form onSubmit={(event) => handleSubmit(event, children, func)}>
      {children.map((elem, i) => (
        <div className="input-parent" key={i}>
          <h3 className="shadow">{elem.title}</h3>
          <input className="input-form" {...elem.props} />
        </div>
      ))}
      <button className="but-form shadow">{button}</button>
    </form>
  );
}
