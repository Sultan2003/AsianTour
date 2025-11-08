import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/Main Page";
import TourIdPage from "../pages/Tour Detail";
import ContactUs from "../pages/ContactUs";
import MainLayout from "../components/MainLayout";
import UzbekistanTours from "../pages/Countries/Uzbekistan";
import CityTours from "../pages/Tour Types/City Tours";
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
import ArmeniaTours from "../pages/Countries/Armenia";
import AzerbaijanTours from "../pages/Countries/Azerbaijan";
import GeorgiaTours from "../pages/Countries/Georgia";
import KazakhstanPrivateTours from "../pages/Private Tours/Kazakhstan";
import SilkRoadPrivateTours from "../pages/Private Tours/Silk Road";
import CentralAsiaPrivateTours from "../pages/Private Tours/Central Asia Private";
import KyrgyzstanPrivateTours from "../pages/Private Tours/Kyrgyzstan Private";
import TajikistanPrivateTours from "../pages/Private Tours/Tajikistan Private";
import TurkmenistanPrivateTours from "../pages/Private Tours/Turkmenistan Private";
import ArmeniaPrivateTours from "../pages/Private Tours/Armenia Private";
import AzerbaijanPrivateTours from "../pages/Private Tours/Azerbaijan Private";
import GeorgiaPrivateTours from "../pages/Private Tours/Georgia Private";
import CaucasusPrivateTours from "../pages/Private Tours/Caucasus Private";
import PrivateTourIdPage from "../pages/Private Tour Detail";
import CulturalTours from "../pages/Tour Types/Cultural Tours";
import GastronomyTours from "../pages/Tour Types/Gastronomy Tours";
import ReligiousTours from "../pages/Tour Types/Religious Tours";
import EcoTours from "../pages/Tour Types/Eco Tours";
import BusinessTours from "../pages/Tour Types/Business Tours";
import Transfers from "../pages/Transfers";
import VisaPolicy from "../pages/VisaPolicy";

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
        path="/Private-tour/:documentId"
        element={
          <MainLayout>
            <PrivateTourIdPage />
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
        path="/Armenia-Tours"
        element={
          <MainLayout>
            <ArmeniaTours />
          </MainLayout>
        }
      />
      <Route
        path="/Azerbaijan-Tours"
        element={
          <MainLayout>
            <AzerbaijanTours />
          </MainLayout>
        }
      />
      <Route
        path="/Georgia-Tours"
        element={
          <MainLayout>
            <GeorgiaTours />
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
        path="/City-Tours"
        element={
          <MainLayout>
            <CityTours />
          </MainLayout>
        }
      />
      <Route
        path="/Cultural-Tours"
        element={
          <MainLayout>
            <CulturalTours />
          </MainLayout>
        }
      />
      <Route
        path="/Gastronomy-Tours"
        element={
          <MainLayout>
            <GastronomyTours />
          </MainLayout>
        }
      />
      <Route
        path="/Religious-Tours"
        element={
          <MainLayout>
            <ReligiousTours />
          </MainLayout>
        }
      />
      <Route
        path="/Eco-Tours"
        element={
          <MainLayout>
            <EcoTours />
          </MainLayout>
        }
      />
      <Route
        path="/Business-Mice-Tours"
        element={
          <MainLayout>
            <BusinessTours />
          </MainLayout>
        }
      />
      <Route
        path="/Asian-Tour-Transfer"
        element={
          <MainLayout>
            <Transfers />
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
      <Route
        path="/Kazakhstan-Private-Tours"
        element={
          <MainLayout>
            <KazakhstanPrivateTours />
          </MainLayout>
        }
      />
      <Route
        path="/Silk-Road-Private-Tours"
        element={
          <MainLayout>
            <SilkRoadPrivateTours />
          </MainLayout>
        }
      />

      <Route
        path="/Central-Asia-Private-Tours"
        element={
          <MainLayout>
            <CentralAsiaPrivateTours />
          </MainLayout>
        }
      />
      <Route
        path="/Kyrgyzstan-Private-Tours"
        element={
          <MainLayout>
            <KyrgyzstanPrivateTours />
          </MainLayout>
        }
      />
      <Route
        path="/Tajikistan-Private-Tours"
        element={
          <MainLayout>
            <TajikistanPrivateTours />
          </MainLayout>
        }
      />
      <Route
        path="/Turkmenistan-Private-Tours"
        element={
          <MainLayout>
            <TurkmenistanPrivateTours />
          </MainLayout>
        }
      />
      <Route
        path="/Armenia-Private-Tours"
        element={
          <MainLayout>
            <ArmeniaPrivateTours />
          </MainLayout>
        }
      />
      <Route
        path="/Azerbaijan-Private-Tours"
        element={
          <MainLayout>
            <AzerbaijanPrivateTours />
          </MainLayout>
        }
      />
      <Route
        path="/Georgia-Private-Tours"
        element={
          <MainLayout>
            <GeorgiaPrivateTours />
          </MainLayout>
        }
      />
      <Route
        path="/Caucasus-Private-Tours"
        element={
          <MainLayout>
            <CaucasusPrivateTours />
          </MainLayout>
        }
      />
      <Route
        path="/visa-policy"
        element={
          <MainLayout>
            <VisaPolicy />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default Router;
