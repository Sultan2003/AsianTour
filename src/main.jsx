import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./scss/global.scss";
import "./i18n";
import Router from "./router";
import { LanguageProvider } from "./context/LanguageContext";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <LanguageProvider>
        <Router />
      </LanguageProvider>
    </BrowserRouter>
  </HelmetProvider>,
);
