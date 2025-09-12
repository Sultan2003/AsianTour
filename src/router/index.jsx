import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/Main Page";
import TourIdPage from "../pages/Tour Detail";
import ContactUs from "../pages/ContactUs";
import MainLayout from "../components/MainLayout";
import UzbekistanTours from "../pages/Countries/Uzbekistan";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <MainPage />
          </MainLayout>
        }
      />
      <Route
        path="/tour/:id"
        element={
          <MainLayout>
            <TourIdPage />
          </MainLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <MainLayout>
            <ContactUs />
          </MainLayout>
        }
      />
      <Route
        path="/Uzbek-Tours"
        element={
          <MainLayout>
            <UzbekistanTours />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default Router;
