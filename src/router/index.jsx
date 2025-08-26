import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "../pages/Main Page";
import TourIdPage from "../pages/Tour Detail";


const Router = () => {
  
    return (
      <Routes>
        <Route path="/" element={<MainPage/ >}/>
        <Route path="/tour/:id" element={<TourIdPage />} />  
      </Routes>
    );
  

  }


export default Router;
