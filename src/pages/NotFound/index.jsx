import { Link } from "react-router-dom";

const NotFound = () => (
  <section aria-labelledby="not-found-title" style={{ maxWidth: "760px", margin: "4rem auto", padding: "0 1.5rem 4rem", textAlign: "center" }}>
    <p>404</p>
    <h1 id="not-found-title">Page not found</h1>
    <p>The page you requested is unavailable or may have moved. Use one of the links below to continue planning your trip.</p>
    <p>
      <Link to="/">Central Asia tours</Link>{" · "}
      <Link to="/uzbek-tours">Uzbekistan tours</Link>{" · "}
      <Link to="/contact">Contact our travel team</Link>
    </p>
  </section>
);

export default NotFound;
