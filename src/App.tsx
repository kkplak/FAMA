import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";
import AboutUs from "./pages/AboutUs";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./locales/en.json";
import translationPL from "./locales/pl.json";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Arrow from "./components/Arrow/ScrollArrow";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import "./App.css";
import Contact from "./pages/Contact";

const resources = {
  en: { translation: translationEN },
  pl: { translation: translationPL },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

const RedirectToDefaultLanguage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const defaultLanguage = "en";
    navigate(`/${defaultLanguage}/home`);
  }, [navigate]);
  return null;
};

const App = () => {
  return (
    <I18nextProvider i18n={i18next}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<RedirectToDefaultLanguage />} />
          <Route path="/:lang/home" element={<Home />} />
          <Route path="/:lang/info" element={<Info />} />
          <Route path="/:lang/contact" element={<Contact />} />
          <Route path="/:lang/about-us" element={<AboutUs />} />
        </Routes>
        <Footer />
      </Router>
    </I18nextProvider>
  );
};

export default App;
