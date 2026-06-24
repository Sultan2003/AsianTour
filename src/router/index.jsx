import { Navigate, Route, Routes } from "react-router-dom";
import SeoHelmet from "../components/SEO/SeoHelmet";
import SeoRuntime from "../components/SEO/SeoRuntime";
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
import SamarkandPage from "../pages/Cities/Uzbekistan/Samarkand";
import BukharaPage from "../pages/Cities/Uzbekistan/Bukhara";
import ScrollToTop from "../components/ScrollToTop";
import SearchPage from "../components/Search";
import KhivaPage from "../pages/Cities/Uzbekistan/Khiva";
import AstanaPage from "../pages/Cities/Kazakhstan/Astana/Astana";
import AlmatyPage from "../pages/Cities/Almaty";
import BishkekPage from "../pages/Cities/Bishkek";
import TbilisiPage from "../pages/Cities/Tbilisi";
import AboutUs from "../pages/AboutUs";
import OshPage from "../pages/Cities/Osh";
import DushanbePage from "../pages/Cities/Dushanbe";
import ErevanPage from "../pages/Cities/Erevan";
import AshgabatPage from "../pages/Cities/Ashgabat";
import BakuPage from "../pages/Cities/Baku";
import PlacestoVisit from "../pages/10BestPlaces";
import BookingForm from "../pages/BookingForm";
import Hotels from "../components/HotelDetails";
import HotelsList from "../components/HotelsList";

import AttractionDetails from "../components/AttractionDetails";

const Router = () => {
  return (
    <>
      <ScrollToTop />
      <SeoHelmet />
      <SeoRuntime />
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <MainPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/tour/:slug"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <TourIdPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/attractions/:slug"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <AttractionDetails />
              </main>
            </MainLayout>
          }
        />

        <Route
          path="/private-tour/:slug"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <PrivateTourIdPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <ContactUs />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/uzbek-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <UzbekistanTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/kazakh-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <KazakhstanTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/kyrgyz-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <KyrgyzstanTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/tajik-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <TajikistanTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/turkmen-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <TurkmenistanTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/central-asia-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <CentralAsiaTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/silk-road-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <SilkRoadTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/caucasus-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <CaucasusTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/armenia-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <ArmeniaTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/azerbaijan-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <AzerbaijanTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/georgia-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <GeorgiaTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/uzbekistan"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <UzbekistanToursDestinations />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/armenia"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <ArmeniaToursDestination />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/azerbaijan"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <AzerbaijanToursDestination />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/georgia"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <GeorgiaToursDestination />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/kazakhstan"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <KazakhstanToursDestinations />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/kyrgyzstan"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <KyrgyzstanToursDestinations />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/tajikistan"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <TajikistanToursDestinations />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/turkmenistan"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <TurkmenistanToursDestinations />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/central-asia"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <CentralAsiaToursDestinations />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/silk-road"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <SilkRoadToursDestinations />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/caucasus"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <CaucasusToursDestinations />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/city-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <CityTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/cultural-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <CulturalTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/gastronomy-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <GastronomyTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/religious-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <ReligiousTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/eco-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <EcoTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/business-mice-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <BusinessTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/asian-tour-transfer"
          element={<Navigate to="/transfer" replace />}
        />
        <Route
          path="/transfer"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <Transfers />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/hotels/:slug"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <Hotels />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/hotels"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <HotelsList />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/weather/:countrySlug"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <WeatherPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/uzbekistan-tashkent"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <TashkentPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/uzbekistan-samarkand"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <SamarkandPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/uzbekistan-khiva"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <KhivaPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/uzbekistan-bukhara"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <BukharaPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/kazakhstan-astana"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <AstanaPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/kazakhstan-almaty"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <AlmatyPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/kyrgyzstan-bishkek"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <BishkekPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/kyrgyzstan-osh"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <OshPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/tajikistan-dushanbe"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <DushanbePage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/turkmenistan-ashgabat"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <AshgabatPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/azerbaijan-baku"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <BakuPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/caucasus-baku"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <BakuPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/armenia-yerevan"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <ErevanPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/caucasus-yerevan"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <ErevanPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/georgia-tbilisi"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <TbilisiPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/caucasus-tbilisi"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <TbilisiPage />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/uzbekistan-private-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <UzbekistanPrivateTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/kazakhstan-private-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <KazakhstanPrivateTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/silk-road-private-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <SilkRoadPrivateTours />
              </main>
            </MainLayout>
          }
        />

        <Route
          path="/central-asia-private-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <CentralAsiaPrivateTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/kyrgyzstan-private-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <KyrgyzstanPrivateTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/tajikistan-private-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <TajikistanPrivateTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/turkmenistan-private-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <TurkmenistanPrivateTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/armenia-private-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <ArmeniaPrivateTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/azerbaijan-private-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <AzerbaijanPrivateTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/georgia-private-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <GeorgiaPrivateTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/caucasus-private-tours"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <CaucasusPrivateTours />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/search"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <SearchPage />
              </main>
            </MainLayout>
          }
        />

        <Route
          path="/visa-policy"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <VisaPolicy />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <AboutUs />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/booking-form"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <BookingForm />
              </main>
            </MainLayout>
          }
        />
        <Route
          path="/10-best-places-to-visit-in-uzbekistan"
          element={
            <MainLayout>
              <main id="main-content" role="main">
                <PlacestoVisit />
              </main>
            </MainLayout>
          }
        />
      </Routes>
    </>
  );
};

export default Router;
