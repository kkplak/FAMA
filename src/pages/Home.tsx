import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import HeroVideoDialog from "../components/HeroDialog/HeroVideoDialog";
import Sticky from "../components/Sticky/Sticky";
import GradualSpacing from "../components/GradualSpacing/GradualSpacing";
import { useTheme } from "next-themes";
import Offert from "../components/Offert/Offert";
import { AnimatedBeamDemo } from "../components/AnimatedBeam/BeamTest";
import { AnimatedBeam } from "../components/AnimatedBeam/AnimatedBeam";
import { Link } from "react-router-dom";
import { ShineBorder } from "../components/ShineBorder/ShineBorder";
import { useLocation } from "react-router-dom";
import { AnimatedBeamMiddle } from "../components/AnimatedBeam/BeamMiddle";
import Slider from "../components/Slider/Slider";
import Box from "../components/Box/Box";

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLanguage = i18n.language;
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  const [contentVisible, setContentVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const videoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const offersRefs = useRef<Array<HTMLDivElement | null>>([]); // Ref for offers
  const [showMore, setShowMore] = useState(false);
  const theme = useTheme();
  const camera = "/media/camera.png";

  const slides = [
    {
      image: "https://www.apple.com/v/apple-watch-ultra-2/f/images/overview/running/running_strain__y3znieztqfma_large.jpg",
      title: "Preprodukcja",
      description: "Opracujemy cały projekt, od stworzenia scenariusza, przez organizację planu zdjęciowego, wynajęcie lokacji i aktorów, po pozostałe kwestie niezbędne do rozpoczęcia nagrań."
    },
    {
      image: "https://www.apple.com/v/apple-watch-ultra-2/f/images/overview/cycling/cycling_pairing__bdtjz1w92ecy_medium.jpg",
      title: "Nagrania",
      description: "Zrealizujemy nagrania na planie zdjęciowym z wykorzystaniem  nowoczesnego sprzętu, w tym profesjonalnego oświetlenia oraz dopracowanej scenografii, które ożywią Twoją wizję."
    },
    {
      image: "https://www.apple.com/v/apple-watch-ultra-2/f/images/overview/cycling/cycling_zones__5jdurpnxicii_medium.jpg",
      title: "Montaż",
      description: "Zmontujemy nagrany materiał  – wszystko, by stworzyć angażujący, film, który wzbudzi emocje u odbiorców."
    },
    {
      image: "https://www.apple.com/v/apple-watch-ultra-2/f/images/overview/running/running_strain__y3znieztqfma_large.jpg",
      title: "Korekcja i efekty",
      description: "Kolor korekcja Obejmuje poprawę kolorystyki, kontrastu i nasycenia, aby ujęcia były spójne wizualnie. Dodaje się efekty wizualne, animacje i poprawki dźwiękowe, takie jak synchronizacja lektora i miksowanie ścieżki audio."
    },
    {
      image: "https://www.apple.com/v/apple-watch-ultra-2/f/images/overview/cycling/cycling_pairing__bdtjz1w92ecy_medium.jpg",
      title: "Slide 5 Title",
      description: "This is the description for slide 5."
    }
  ];

  // Toggle between showing all videos or just the first four
  const toggleShowMore = () => setShowMore(!showMore);

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }

    const timer = setTimeout(() => {
      setLoading(false);
      setContentVisible(true);
    }, 1500);

    document.body.classList.toggle("no-scroll", loading);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("no-scroll");
    };
  }, [lang, i18n, loading]);

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "");
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    videoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    offersRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (videoRefs.current) {
        videoRefs.current.forEach((ref) => ref && observer.unobserve(ref));
      }
      if (offersRefs.current) {
        offersRefs.current.forEach((ref) => ref && observer.unobserve(ref)); // Unobserve the offers section
      }
    };
  }, [contentVisible]);

  const openModal = (videoUrl: string) => {
    setCurrentVideo(videoUrl);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentVideo("");
  };

  return (
    <div id="top-of-page" className="homepage ">
      <div className={`loader ${loading ? "" : "hidden"}`}>
        <h1 className="hero-title">{t("fama")}</h1>
        {/* <h1 className="hero-title film">{t("film")}</h1> */}
      </div>

      <div
        id="home"
        className={`hero-section ${contentVisible ? "visible" : ""}`}
      >
        <iframe
          src="https://www.youtube.com/embed/EfmEQTNOEuk?autoplay=1&mute=1&loop=1&playlist=EfmEQTNOEuk"
          frameBorder="0"
          allow="autoplay; loop; muted"
          allowFullScreen
          title="FAMA Video"
          className="background-video"
        ></iframe>
        {/* <video autoPlay muted loop className="background-video" playsInline>
          <source src="/media/fama_demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}

        <div className="overlay">
          <Sticky offset={35}>
            <h1 className="hero-title">{t("fama")}</h1>
          </Sticky>
          {/* <h1 className='hero-title film'>{t("film")}</h1> */}
        </div>
        {/* <div className="subtitles-container">
          <Subtitles />
        </div> */}
      </div>
      <div className="magic-text container ">
        <div className="text-wrapper ">
          <GradualSpacing
            className="font-display text-center text-m font-bold tracking-[-0.1em]  text-black dark:text-white md:text-m md:leading-[5rem]"
            text={t("magicText")}
          />
            <p className="home-p">{t("homeP")}</p>
        </div>
      </div>
      {/* <div className="magic-text container "> */}
        {/* <div className="text-wrapper "> */}
          {/* <p>{t("homeP")}</p> */}
          {/* <div className="my-4">
            <Link to={`/${currentLanguage}/aboutus`}>
              <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                O nas
              </button>
            </Link>
          </div> */}
        {/* </div> */}
      {/* </div> */}
      <div className="container-home home ">
      <div className="text-container">
        <h1>Nasza oferta</h1>
      </div>
      <div className="box-container" >
       <Box
       iconPath="/media/reprodukcja.png"
       title="Preprodukcja"
       description="Tutaj Twoje pomysły nabiorą konkretnych kształtów! W tej fazie zajmiemy się opracowaniem koncepcji, oraz angażującego scenariusza. Zaplanujemy harmonogram działań, wybierzemy lokacje i aktorów.  Preprodukcja to kluczowy krok, który wpływa na jakość finalnego materiału, a staranne przygotowanie zwiększa szanse na udaną realizację."/>
              <Box
       iconPath="/media/produkcja.png"
       title="Produkcja"
       description="Tutaj Twoje pomysły nabiorą konkretnych kształtów! W tej fazie zajmiemy się opracowaniem koncepcji, oraz angażującego scenariusza. Zaplanujemy harmonogram działań, wybierzemy lokacje i aktorów.  Preprodukcja to kluczowy krok, który wpływa na jakość finalnego materiału, a staranne przygotowanie zwiększa szanse na udaną realizację."/>
              <Box
       iconPath="/media/postprodukcja.png"
       title="Postprodukcja"
       description="Tutaj Twoje pomysły nabiorą konkretnych kształtów! W tej fazie zajmiemy się opracowaniem koncepcji, oraz angażującego scenariusza. Zaplanujemy harmonogram działań, wybierzemy lokacje i aktorów.  Preprodukcja to kluczowy krok, który wpływa na jakość finalnego materiału, a staranne przygotowanie zwiększa szanse na udaną realizację."/></div>
        </div>
      <div id="portfolio" className={`content ${!loading ? "visible" : ""}`}>
        <div
          id="content"
          className={`button-box-container ${!loading ? "visible" : ""}`}
        >
       
          {/* <AnimatedBeamDemo /> */}
          {/* <AnimatedBeamMiddle /> */}
          {/* <Offert offersData={offersData} /> */}
        
        </div>
        <div className="container-home home">
          <div className="text-container">
            <h1>{t("homeH1")}</h1>
          </div>

          <div className="video-portfolio">
            <div className="relative ">
              <HeroVideoDialog
                className="hidden dark:block "
                animationStyle="from-center"
                   credits="Director: Adam, Camera: Eve, Scenography: John"
                videoSrc="https://www.youtube.com/embed/3xwy-0rYLZQ"
                thumbnailSrc="/media/DerwiszBMW.png"
                thumbnailAlt="Derwisz BMW"
                title={t("port1")}
               
              />
            </div>
            <div className="relative ">
              <HeroVideoDialog
                className="hidden dark:block "
                animationStyle="from-center"
                   credits="Director: Adam, Camera: Eve, Scenography: John"
                videoSrc="https://www.youtube.com/embed/3xwy-0rYLZQ"
                thumbnailSrc="/media/ratownik.png"
                thumbnailAlt="Hero Video"
                title={t("port2")}
             
              />
            </div>
            <div className="relative ">
              <HeroVideoDialog
                className="hidden dark:block "
                animationStyle="from-center"
                   credits="Director: Adam, Camera: Eve, Scenography: John"
                videoSrc="https://www.youtube.com/embed/3xwy-0rYLZQ"
                thumbnailSrc="/media/one-gog.png"
                thumbnailAlt="Hero Video"
                title={t("port3")}
             
              />
            </div>
            <div className="relative ">
              <HeroVideoDialog
                className="hidden dark:block "
                animationStyle="from-center"
                    credits="Director: Adam, Camera: Eve, Scenography: John"
                videoSrc="https://www.youtube.com/embed/3xwy-0rYLZQ"
                thumbnailSrc="/media/creme.png"
                thumbnailAlt="Hero Video"
                title={t("port4")}
               
              />
            </div>
            {showMore && (
              <>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                      credits="Director: Adam, Camera: Eve, Scenography: John"
                    videoSrc="https://www.youtube.com/embed/3xwy-0rYLZQ"
                    thumbnailSrc="/media/drutex.png"
                    thumbnailAlt="Hero Video"
                    title={t("port5")}
                
                  />{" "}
                </div>

                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                       credits="Director: Adam, Camera: Eve, Scenography: John"
                    videoSrc="https://www.youtube.com/embed/3xwy-0rYLZQ"
                    thumbnailSrc="/media/timberfast.png"
                    thumbnailAlt="Hero Video"
                    title={t("port6")}
                   
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                       credits="Director: Adam, Camera: Eve, Scenography: John"
                    videoSrc="https://www.youtube.com/embed/3xwy-0rYLZQ"
                    thumbnailSrc="/media/creme.png"
                    thumbnailAlt="Hero Video"
                    title={t("port4")}
                   
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                         credits="Director: Adam, Camera: Eve, Scenography: John"
                    videoSrc="https://www.youtube.com/embed/3xwy-0rYLZQ"
                    thumbnailSrc="/media/creme.png"
                    thumbnailAlt="Hero Video"
                    title={t("port4")}
                  
                  />
                </div>
              </>
            )}
          </div>
          <div className="mt-8">
            <ShineBorder
              className="mx-auto relative flex w-max flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
              color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            >
              <button onClick={toggleShowMore} className="w-full h-full">
                {showMore ? "Show Less" : "Show More"}
              </button>
            </ShineBorder>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={`modal-overlay show`} onClick={closeModal}>
          <div className={`modal-content`} onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <iframe
              width="1200"
              height="655"
              src={currentVideo}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}    <div className="container-home home ">
      <div className="text-container">
        <h1>Nasze uslugi</h1>
      </div>
        <Slider slides={slides} />
        </div>
    </div>
  );
};

export default Home;
