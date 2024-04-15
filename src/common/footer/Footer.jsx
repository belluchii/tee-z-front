import "./footer.css";
export default function Footer() {
  return (
    <footer
      className="footer 
 text-light"
    >
      <div className="flex a-bot">
        <div>
          <h3>Email</h3>
          <p>info@TeeZyCo.com</p>
        </div>
        <div>
          <h3>Dirección </h3>
          <p>Corrientes xxxx, CABA</p>
        </div>
        <div>
          <h3>Teléfono</h3>
          <p> +xx xxx xxx xxx</p>
        </div>
        <div>
          <h3>Tee-z</h3>
          <p>© 2023 TeeZyCo. casi todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
