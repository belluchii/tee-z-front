import "./trending.css";
export default function Trending() {
  return (
    <>
      <h2 className="shadow h2-trending">Productos nuevos y a la moda</h2>
      <article className="flex product-cont">
        <img
          src={img}
          className="img-bord box-shadow product"
          alt="producto 3"
        />
        <img
          src={img}
          className="img-bord box-shadow product"
          alt="producto 3"
        />

        <img
          src={img}
          className="img-bord box-shadow product"
          alt="producto 3"
        />
      </article>
    </>
  );
}

const img =
  "https://http2.mlstatic.com/D_NQ_NP_627659-MLA54719189617_032023-O.webp";
