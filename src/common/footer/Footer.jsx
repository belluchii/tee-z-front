import "./footer.css";
export default function Footer() {
  return (
    <footer
      className="footer 
 text-light"
    >
      <div>
        <h3 className="item-footer">Email</h3>
        <p className="item-footer">info@TeeZyCo.com</p>
      </div>
      <div>
        <h3 className="item-footer">Dirección </h3>
        <p className="item-footer">Corrientes xxxx, CABA</p>
      </div>
      <div>
        <h3 className="item-footer">Teléfono</h3>
        <p className="item-footer"> +xx xxx xxx xxx</p>
      </div>
      <div>
        <h3 className="item-footer">Tee-z</h3>
        <p className="item-footer">
          © 2023 TeeZyCo. casi todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
