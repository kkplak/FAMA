import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en.json";
import translationPL from "./locales/pl.json";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { useLocation } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import "./App.css";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";
import { Canvas } from "@react-three/fiber";
import OrganicBackground from "./components/OrganicBackground";

const resources = {
  en: { translation: translationEN },
  pl: { translation: translationPL },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "pl",
  fallbackLng: "pl",
  interpolation: { escapeValue: false },
});
const RedirectToDefaultLanguage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      const defaultLanguage = "pl";
      navigate(`/${defaultLanguage}/home`);
    }
  }, [navigate, location]);

  return null;
};

const App = () => {
  return (
    // <HelmetProvider>
    <I18nextProvider i18n={i18next}>
      <Router>
        {/* <ScrollToTop /> */}
        <Canvas
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
          }}
          camera={{ position: [0, 0, 5], fov: 50 }}
        >
          <OrganicBackground />
        </Canvas>
        <NavBar />
        <Routes>
          <Route path='/' element={<RedirectToDefaultLanguage />} />
          <Route path='/:lang/home' element={<Home />} />
          <Route path='/:lang/aboutus' element={<AboutUs />} />
        </Routes>
        <Footer />
      </Router>
    </I18nextProvider>
    // </HelmetProvider>
  );
};

export default App;
