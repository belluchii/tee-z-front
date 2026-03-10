import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <h2 className="footer-logo">TeeZyCo</h2>
          <p className="footer-copy">© 2023 TeeZyCo. Derechos reservados.</p>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h4 className="footer-col-title">contacto</h4>
            <p className="footer-col-item">info@TeeZyCo.com</p>
            <p className="footer-col-item">+xx xxx xxx xxx</p>
            <p className="footer-col-item">Corrientes xxxx, CABA</p>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">navegación</h4>
            <p className="footer-col-item">productos</p>
            <p className="footer-col-item">categorías</p>
            <p className="footer-col-item">nuevo</p>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">cuenta</h4>
            <p className="footer-col-item">iniciar sesión</p>
            <p className="footer-col-item">registrarse</p>
            <p className="footer-col-item">favoritos</p>
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <span>TeeZyCo — Buenos Aires, Argentina</span>
      </div>
    </footer>
  );
}
