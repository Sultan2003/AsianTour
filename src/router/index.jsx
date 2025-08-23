import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "../pages/Main Page";


const Router = () => {
  
    return (
      <Routes>
        <Route path="/" element={<MainPage/ >}>
        </Route>
      </Routes>
    );
  

  }


export default Router;
