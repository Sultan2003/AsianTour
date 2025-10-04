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
import UzbekistanToursDestinations from "../pages/Countries copy/Uzbekistan";
import KazakhstanToursDestinations from "../pages/Countries copy/Kazakhstan";
import KyrgyzstanToursDestinations from "../pages/Countries copy/Kyrgyzstan";
import TajikistanToursDestinations from "../pages/Countries copy/Tadjikistan";
import TurkmenistanToursDestinations from "../pages/Countries copy/Turkmenistan";
import CentralAsiaToursDestinations from "../pages/Countries copy/Central Asia";
import SilkRoadToursDestinations from "../pages/Countries copy/Silk Road";
import CaucasusToursDestinations from "../pages/Countries copy/Caucasus";
import WeatherPage from "../pages/Weather Page";
import ArmeniaToursDestination from "../pages/Countries copy/Armenia";
import AzerbaijanToursDestination from "../pages/Countries copy/Azerbaijan";
import GeorgiaToursDestination from "../pages/Countries copy/Georgia";
import TashkentPage from "../pages/Cities/Uzbekistan/Tashkent";
import UzbekistanPrivateTours from "../pages/Private Tours/Uzbekistan";

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
        path="/Uzbekistan"
        element={
          <MainLayout>
            <UzbekistanToursDestinations />
          </MainLayout>
        }
      />
      <Route
        path="/Armenia"
        element={
          <MainLayout>
            <ArmeniaToursDestination />
          </MainLayout>
        }
      />
      <Route
        path="/Azerbaijan"
        element={
          <MainLayout>
            <AzerbaijanToursDestination />
          </MainLayout>
        }
      />
      <Route
        path="/Georgia"
        element={
          <MainLayout>
            <GeorgiaToursDestination />
          </MainLayout>
        }
      />
      <Route
        path="/Kazakhstan"
        element={
          <MainLayout>
            <KazakhstanToursDestinations />
          </MainLayout>
        }
      />
      <Route
        path="/Kyrgyzstan"
        element={
          <MainLayout>
            <KyrgyzstanToursDestinations />
          </MainLayout>
        }
      />
      <Route
        path="/Tajikistan"
        element={
          <MainLayout>
            <TajikistanToursDestinations />
          </MainLayout>
        }
      />
      <Route
        path="/Turkmenistan"
        element={
          <MainLayout>
            <TurkmenistanToursDestinations />
          </MainLayout>
        }
      />
      <Route
        path="/Central-Asia"
        element={
          <MainLayout>
            <CentralAsiaToursDestinations />
          </MainLayout>
        }
      />
      <Route
        path="/Silk-Road"
        element={
          <MainLayout>
            <SilkRoadToursDestinations />
          </MainLayout>
        }
      />
      <Route
        path="/Caucasus"
        element={
          <MainLayout>
            <CaucasusToursDestinations />
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
      <Route
        path="/weather/:countrySlug"
        element={
          <MainLayout>
            <WeatherPage />
          </MainLayout>
        }
      />
      <Route
        path="/Uzbekistan-Tashkent"
        element={
          <MainLayout>
            <TashkentPage />
          </MainLayout>
        }
      />
      <Route
        path="/Uzbekistan-Private-Tours"
        element={
          <MainLayout>
            <UzbekistanPrivateTours />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default Router;
