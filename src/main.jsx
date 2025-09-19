import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./scss/global.scss";
import Router from "./router";
import { LanguageProvider } from "./context/LanguageContext"


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LanguageProvider>
      <Router />
    </LanguageProvider>
  </BrowserRouter>
);
