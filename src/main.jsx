import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./scss/global.module.scss"

import Router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
 
    <BrowserRouter>
      <Router />
    </BrowserRouter>
 
);
