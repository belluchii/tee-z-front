import "./title.css";
export default function Title({ h2 }) {
  return (
    <>
      <div className="title-cont">
        <h2 className="title">{h2}</h2>
      </div>
    </>
  );
}
