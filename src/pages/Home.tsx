import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import HeroVideoDialog from "../components/HeroDialog/HeroVideoDialog";
import Sticky from "../components/Sticky/Sticky";
import GradualSpacing from "../components/GradualSpacing/GradualSpacing";
import { useLocation } from "react-router-dom";
import Box from "../components/Box/Box";
import { BlurFade } from "../components/BlurFade/BlurFade";
import ToggleDescription from "../components/Toggle/Toggle";
import { AppleCardsCarouselDemo } from "../components/AppleCard/CardsDemo";
import { AppleCardsCarouselDemo2 } from "../components/AppleCard/CardsDemo2";
// import { Helmet } from "react-helmet-async";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 980);

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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 980);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    //  <Helmet>
    //     <title>My Awesome Page</title>
    //     <meta name="description" content="This is a detailed description of my page for SEO." />
    //   </Helmet>
    <div id='top-of-page' className='homepage '>
      <div className={`loader ${loading ? "" : "hidden"}`}>
        <h1 className='hero-title'>{t("fama")}</h1>
      </div>
      <div
        id='home'
        className={`hero-section ${contentVisible ? "visible" : ""}`}
      >
        {!isMobile ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className='background-video-desktop'
          >
            <source src='/media/video/hero-desktop.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            className='background-video-mobile'
          >
            <source src='/media/video/hero-mobile.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        )}

        <div className='overlay'>
          {!isMobile ? (
            <Sticky offset={38}>
              <h1 className='hero-title z-40'>{t("fama")}</h1>
            </Sticky>
          ) : (
            <Sticky offset={22}>
              <h1 className='hero-title z-40'>{t("fama")}</h1>
            </Sticky>
          )}
        </div>
      </div>
      <div className='magic-text container '>
        <div className='text-wrapper '>
          <GradualSpacing
            className='font-display text-center text-m font-bold tracking-[-0.1em]  text-black dark:text-white md:text-m md:leading-[5rem]'
            text={t("magicText")}
          />
          <BlurFade delay={0.25} inView>
            <p className='home-p'>{t("homeP")}</p>
          </BlurFade>
        </div>
      </div>
      <div id='portfolio' className={`content ${!loading ? "visible" : ""}`}>
        <div
          id='content'
          className={`button-box-container ${!loading ? "visible" : ""}`}
        ></div>
        <BlurFade delay={0.25} inView>
          <div className='text-container'>
            <h1>{t("homePorfolio")}</h1>
          </div>
        </BlurFade>
        <div className='container-home home'>
          {/* <BlurFade delay={0.25} inView> */}
          <div className='video-portfolio'>
            <div className='relative '>
              <HeroVideoDialog
                className='dark:block '
                animationStyle='from-center'
                credits={t("port1Credits")}
                videoSrc={t("port1Src")}
                thumbnailSrc={t("port1Img")}
                thumbnailAlt={t("port1")}
                title={t("port1")}
              />
            </div>
            <div className='relative '>
              <HeroVideoDialog
                className=' dark:block '
                animationStyle='from-center'
                credits={t("port2Credits")}
                videoSrc={t("port2Src")}
                thumbnailSrc={t("port2Img")}
                thumbnailAlt={t("port2")}
                title={t("port2")}
              />
            </div>
            <div className='relative '>
              <HeroVideoDialog
                className='dark:block '
                animationStyle='from-center'
                credits={t("port3Credits")}
                videoSrc={t("port3Src")}
                thumbnailSrc={t("port3Img")}
                thumbnailAlt={t("port3")}
                title={t("port3")}
              />
            </div>
            <div className='relative '>
              <HeroVideoDialog
                className=' dark:block '
                animationStyle='from-center'
                credits={t("port4Credits")}
                videoSrc={t("port4Src")}
                thumbnailSrc={t("port4Img")}
                thumbnailAlt={t("port4")}
                title={t("port4")}
              />
            </div>
          </div>
          <ToggleDescription
            title='See more'
            description={
              <>
                <div className='video-portfolio'>
                  <div className='relative '>
                    <HeroVideoDialog
                      className=' dark:block '
                      animationStyle='from-center'
                      credits={t("port5Credits")}
                      videoSrc={t("port5Src")}
                      thumbnailSrc={t("port5Img")}
                      thumbnailAlt={t("port5")}
                      title={t("port5")}
                    />{" "}
                  </div>
                  <div className='relative '>
                    <HeroVideoDialog
                      className=' dark:block '
                      animationStyle='from-center'
                      credits={t("port6Credits")}
                      videoSrc={t("port6Src")}
                      thumbnailSrc={t("port6Img")}
                      thumbnailAlt={t("port6")}
                      title={t("port6")}
                    />
                  </div>
                </div>

                <div className='text-container smaller-margin '>
                  <h1>{t("homePorfolioCollab")}</h1>
                </div>

                <div className='video-portfolio'>
                  <div className='relative '>
                    <HeroVideoDialog
                      className=' dark:block '
                      animationStyle='from-center'
                      credits={t("port7Credits")}
                      videoSrc={t("port7Src")}
                      thumbnailSrc={t("port7Img")}
                      thumbnailAlt={t("port7")}
                      title={t("port7")}
                    />
                  </div>
                  <div className='relative '>
                    <HeroVideoDialog
                      className='dark:block '
                      animationStyle='from-center'
                      credits={t("port8Credits")}
                      videoSrc={t("port8Src")}
                      thumbnailSrc={t("port8Img")}
                      thumbnailAlt={t("port8")}
                      title={t("port8")}
                    />
                  </div>
                  <div className='relative '>
                    <HeroVideoDialog
                      className='dark:block '
                      animationStyle='from-center'
                      credits={t("port9Credits")}
                      videoSrc={t("port9Src")}
                      thumbnailSrc={t("port9Img")}
                      thumbnailAlt={t("port9")}
                      title={t("port9")}
                    />
                  </div>
                  <div className='relative '>
                    <HeroVideoDialog
                      className='dark:block '
                      animationStyle='from-center'
                      credits={t("port10Credits")}
                      videoSrc={t("port10Src")}
                      thumbnailSrc={t("port10Img")}
                      thumbnailAlt={t("port10")}
                      title={t("port10")}
                    />
                  </div>
                  <div className='relative '>
                    <HeroVideoDialog
                      className=' dark:block '
                      animationStyle='from-center'
                      credits={t("port11Credits")}
                      videoSrc={t("port11Src")}
                      thumbnailSrc={t("port11Img")}
                      thumbnailAlt={t("port11")}
                      title={t("port11")}
                    />
                  </div>
                  <div className='relative '>
                    <HeroVideoDialog
                      className=' dark:block '
                      animationStyle='from-center'
                      credits={t("port12Credits")}
                      videoSrc={t("port12Src")}
                      thumbnailSrc={t("port12Img")}
                      thumbnailAlt={t("port12")}
                      title={t("port12")}
                    />
                  </div>
                  <div className='relative '>
                    <HeroVideoDialog
                      className='dark:block '
                      animationStyle='from-center'
                      credits={t("port13Credits")}
                      videoSrc={t("port13Src")}
                      thumbnailSrc={t("port13Img")}
                      thumbnailAlt={t("port13")}
                      title={t("port13")}
                    />
                  </div>
                  <div className='relative '>
                    <HeroVideoDialog
                      className='dark:block '
                      animationStyle='from-center'
                      credits={t("port14Credits")}
                      videoSrc={t("port14Src")}
                      thumbnailSrc={t("port14Img")}
                      thumbnailAlt={t("port14")}
                      title={t("port14")}
                    />
                  </div>
                  <div className='relative '>
                    <HeroVideoDialog
                      className='dark:block '
                      animationStyle='from-center'
                      credits={t("port15Credits")}
                      videoSrc={t("port15Src")}
                      thumbnailSrc={t("port15Img")}
                      thumbnailAlt={t("port15")}
                      title={t("port15")}
                    />
                  </div>
                  <div className='relative '>
                    <HeroVideoDialog
                      className=' dark:block '
                      animationStyle='from-center'
                      credits={t("port16Credits")}
                      videoSrc={t("port16Src")}
                      thumbnailSrc={t("port16Img")}
                      thumbnailAlt={t("port16")}
                      title={t("port16")}
                    />
                  </div>
                </div>
              </>
            }
          />

          {/* </BlurFade> */}
        </div>
      </div>
      {isOpen && (
        <div className={`modal-overlay show`} onClick={closeModal}>
          <div className={`modal-content`} onClick={(e) => e.stopPropagation()}>
            <button className='close-button' onClick={closeModal}>
              &times;
            </button>
            <iframe
              width='1200'
              height='655'
              src={currentVideo}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}{" "}
      <BlurFade delay={0.25} inView>
        <div className='text-container'>
          <h1>{t("homeOffer")}</h1>
        </div>
      </BlurFade>
      <AppleCardsCarouselDemo2 />
      <div id='offer'>
        <BlurFade delay={0.25} inView>
          <div className='box-container'>
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
      <div id='offer-wrapper'>
        <BlurFade delay={0.25} inView>
          <div className='text-container'>
            <h1>{t("homeSliderH1")}</h1>
          </div>
        </BlurFade>
        <div className='container-custom-offer home '>
          <BlurFade delay={0.25} inView>
            <AppleCardsCarouselDemo />
          </BlurFade>
        </div>

        {/* <BlurFade delay={0.25} inView>
              <Slider slides={slides} />
            </BlurFade> */}
      </div>
    </div>
  );
};

export default Home;
