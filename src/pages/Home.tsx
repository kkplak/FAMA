import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import HeroVideoDialog from "../components/HeroDialog/HeroVideoDialog";
import Sticky from "../components/Sticky/Sticky";
import GradualSpacing from "../components/GradualSpacing/GradualSpacing";
import { useTheme } from "next-themes";
import { useLocation } from "react-router-dom";
import Slider from "../components/Slider/Slider";
import Box from "../components/Box/Box";
import { BlurFade } from "../components/BlurFade/BlurFade";
import ToggleDescription from "../components/Toggle/Toggle";

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

  const slides = [
    {
      image: t("slide1Src"),
      title: t("slide1H1"),
    },
    {
      image: t("slide2Src"),
      title: t("slide2H1"),
    },
    {
      image: t("slide3Src"),
      title: t("slide3H1"),
    },
    {
      image: t("slide4Src"),
      title: t("slide4H1"),
    },
    {
      image: t("slide5Src"),
      title: t("slide5H1"),
    },
  ];

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
        offersRefs.current.forEach((ref) => ref && observer.unobserve(ref));
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

        <div className="overlay">
          <Sticky offset={35}>
            <h1 className="hero-title">{t("fama")}</h1>
          </Sticky>
        </div>
      </div>
      <div className="magic-text container ">
        <div className="text-wrapper ">
          <GradualSpacing
            className="font-display text-center text-m font-bold tracking-[-0.1em]  text-black dark:text-white md:text-m md:leading-[5rem]"
            text={t("magicText")}
          />
          <BlurFade delay={0.25} inView>
            <p className="home-p">{t("homeP")}</p>
          </BlurFade>
        </div>
      </div>
      <div id="offer" className="container-home home ">
        <BlurFade delay={0.25} inView>
          <div className="text-container">
            <h1>{t("homeOffer")}</h1>
          </div>
        </BlurFade>
        <BlurFade delay={0.25} inView>
          <div className="box-container">
            <Box
              iconPath={t("homeOffer1Src")}
              title={t("homeOffer1Title")}
              description={t("homeOffer1Copy")}
            />
            <Box
              iconPath={t("homeOffer2Src")}
              title={t("homeOffer2Title")}
              description={t("homeOffer2Copy")}
            />
            <Box
              iconPath={t("homeOffer3Src")}
              title={t("homeOffer3Title")}
              description={t("homeOffer3Copy")}
            />
          </div>
        </BlurFade>
      </div>
      <div id="portfolio" className={`content ${!loading ? "visible" : ""}`}>
        <div
          id="content"
          className={`button-box-container ${!loading ? "visible" : ""}`}
        ></div>
        <div className="container-home home">
          <BlurFade delay={0.25} inView>
            <div className="text-container">
              <h1>{t("homePorfolio")}</h1>
            </div>
          </BlurFade>
          {/* <BlurFade delay={0.25} inView> */}
          <div className="video-portfolio">
            <div className="relative ">
              <HeroVideoDialog
                className="hidden dark:block "
                animationStyle="from-center"
                credits={t("port1Credits")}
                videoSrc={t("port1Src")}
                thumbnailSrc={t("port1Img")}
                thumbnailAlt={t("port1")}
                title={t("port1")}
              />
            </div>
            <div className="relative ">
              <HeroVideoDialog
                className="hidden dark:block "
                animationStyle="from-center"
                credits={t("port2Credits")}
                videoSrc={t("port2Src")}
                thumbnailSrc={t("port2Img")}
                thumbnailAlt={t("port2")}
                title={t("port2")}
              />
            </div>
            <div className="relative ">
              <HeroVideoDialog
                className="hidden dark:block "
                animationStyle="from-center"
                credits={t("port3Credits")}
                videoSrc={t("port3Src")}
                thumbnailSrc={t("port3Img")}
                thumbnailAlt={t("port3")}
                title={t("port3")}
              />
            </div>
            <div className="relative ">
              <HeroVideoDialog
                className="hidden dark:block "
                animationStyle="from-center"
                credits={t("port4Credits")}
                videoSrc={t("port4Src")}
                thumbnailSrc={t("port4Img")}
                thumbnailAlt={t("port4")}
                title={t("port4")}
              />
            </div>
          </div>
          <ToggleDescription
            title="See more"
            description={
              <div className="video-portfolio">
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                    credits={t("port5Credits")}
                    videoSrc={t("port5Src")}
                    thumbnailSrc={t("port5Img")}
                    thumbnailAlt={t("port5")}
                    title={t("port5")}
                  />{" "}
                </div>

                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                    credits="Produkcja: Dzida Film Studio&nbsp; Zdjęcia: Łukasz Baliński, Bartłomiej Wieloszewski&nbsp; Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/jclPM5ZWPe8"
                    thumbnailSrc="/media/port6.png"
                    thumbnailAlt={t("port6")}
                    title={t("port6")}
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                    credits="Produkcja: Splash Media &nbsp;Zdjęcia: Krzysztof Sosnowski, Michał Środek &nbsp;Montaż: Michał Środek"
                    videoSrc="https://www.youtube.com/embed/sMt4uqkbVRY"
                    thumbnailSrc="/media/port7.png"
                    thumbnailAlt={t("port7")}
                    title={t("port7")}
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                    credits="Produkcja: Splash Media&nbsp; Zdjęcia: Michał Środek, Michał Grzyb &nbsp;Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/NVCT-CbqyfM"
                    thumbnailSrc="/media/port8.png"
                    thumbnailAlt={t("port8")}
                    title={t("port8")}
                  />
                </div>

                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                    credits="Produkcja: FAMA Film &nbsp;Zdjęcia: Krzysztof Sosnowski &nbsp;Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/qmKGNlvvNxM"
                    thumbnailSrc="/media/port9.png"
                    thumbnailAlt={t("port9")}
                    title={t("port9")}
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                    credits="Produkcja: FAMA Film &nbsp;Zdjęcia: Krzysztof Sosnowski &nbsp;Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/3xwy-0rYLZQ"
                    thumbnailSrc="/media/port10.png"
                    thumbnailAlt={t("port10")}
                    title={t("port10")}
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                    credits="Produkcja: Polarise &nbsp;Zdjęcia: Krzysztof Sosnowski&nbsp;Operator drona: Przemek Zdybel &nbsp;Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/_dBHXOMdkas"
                    thumbnailSrc="/media/port11.png"
                    thumbnailAlt={t("port11")}
                    title={t("port11")}
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                    credits="Produkcja: Polarise &nbsp;Zdjęcia: Kamil Dziubczyński, Krzysztof Sosnowski  &nbsp;Operator drona: Przemek Zdybel &nbsp; Montaż: Kamil Dziubczyński"
                    videoSrc="https://www.youtube.com/embed/-1VtDOV7BcQ"
                    thumbnailSrc="/media/port12.png"
                    thumbnailAlt={t("port12")}
                    title={t("port12")}
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                    credits="Produkcja: FAMA Film &nbsp;Zdjęcia: Krzysztof Sosnowski &nbsp;Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/c4Aeq7EHmBw"
                    thumbnailSrc="/media/port13.png"
                    thumbnailAlt={t("port13")}
                    title={t("port13")}
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                    credits="Produkcja: Splash Media &nbsp;Zdjęcia: Michał Środek, Michał Grzyb &nbsp;Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/pzJerK9wR5k"
                    thumbnailSrc="/media/port14.png"
                    thumbnailAlt={t("port14")}
                    title={t("port14")}
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                    credits="Produkcja: Polarise &nbsp;Zdjęcia: Krzysztof Sosnowski &nbsp;Operator drona: Przemek Zdybel &nbsp;Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/Pt9FXClwn_k"
                    thumbnailSrc="/media/port15.png"
                    thumbnailAlt={t("port15")}
                    title={t("port15")}
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                    credits="Produkcja: Polarise &nbsp;Zdjęcia: Krzysztof Sosnowski &nbsp;Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/SHPrruFKpug"
                    thumbnailSrc="/media/port16.png"
                    thumbnailAlt={t("port16")}
                    title={t("port16")}
                  />
                </div>
              </div>
            }
          />

          {/* </BlurFade> */}
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
      )}{" "}
      <div className="container-home home container-offer">
        <BlurFade delay={0.25} inView>
          <div className="text-container">
            <h1>{t("homeSliderH1")}</h1>
          </div>
        </BlurFade>
        <BlurFade delay={0.25} inView>
          <Slider slides={slides} />
        </BlurFade>
      </div>
    </div>
  );
};

export default Home;
