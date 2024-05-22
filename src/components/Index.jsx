import Footer from "../common/footer/Footer";
import Main from "../common/main/Main";
import ProdSwiper from "../common/prodswiper/ProdSwiper";

export default function Index() {
  return (
    <>
      <Main />
      <ProdSwiper h2={"A la moda"} tag={"Oversize"} />
      <ProdSwiper h2={"Favoritos de esta semana"} tag={"Urban"} />
      <ProdSwiper h2={"Vanguardistas"} tag={"Aesthetic"} />
      <Footer />
    </>
  );
}

//<Trending name={"los angeles overzise"} title={"Top sellers"} />
