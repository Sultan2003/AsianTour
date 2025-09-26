import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/Main Page";
import TourIdPage from "../pages/Tour Detail";
import ContactUs from "../pages/ContactUs";
import MainLayout from "../components/MainLayout";
import UzbekistanTours from "../pages/Countries/Uzbekistan";
import HikingTours from "../pages/Tour Types/Hiking";
import KazakhstanTours from "../pages/Countries/Kazakhstan";
import KyrgyzstanTours from "../pages/Countries/Kyrgyzstan";
import TajikistanTours from "../pages/Countries/Tadjikistan";
import TurkmenistanTours from "../pages/Countries/Turkmenistan";
import CaucasusTours from "../pages/Countries/Caucasus";
import CentralAsiaTours from "../pages/Countries/Central Asia";
import SilkRoadTours from "../pages/Countries/Silk Road";

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
        path="/tour/:documentId"
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
      <Route
        path="/Kazakh-Tours"
        element={
          <MainLayout>
            <KazakhstanTours />
          </MainLayout>
        }
      />
      <Route
        path="/Kyrgyz-Tours"
        element={
          <MainLayout>
            <KyrgyzstanTours />
          </MainLayout>
        }
      />
      <Route
        path="/Tajik-Tours"
        element={
          <MainLayout>
            <TajikistanTours />
          </MainLayout>
        }
      />
      <Route
        path="/Turkmen-Tours"
        element={
          <MainLayout>
            <TurkmenistanTours />
          </MainLayout>
        }
      />
      <Route
        path="/Central-Asia-Tours"
        element={
          <MainLayout>
            <CentralAsiaTours />
          </MainLayout>
        }
      />
      <Route
        path="/Silk-Road-Tours"
        element={
          <MainLayout>
            <SilkRoadTours />
          </MainLayout>
        }
      />
      <Route
        path="/Caucas-Tours"
        element={
          <MainLayout>
            <CaucasusTours />
          </MainLayout>
        }
      />
      <Route
        path="/Hiking-Tours"
        element={
          <MainLayout>
            <HikingTours />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default Router;
