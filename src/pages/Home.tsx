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
        </div>
      </div>
      <div className="magic-text container ">
        <div className="text-wrapper ">
          <p>{t("homeP")}</p>
          <div className="my-4">
            <Link to={`/${currentLanguage}/aboutus`}>
              <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                O nas
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div id="portfolio" className={`content ${!loading ? "visible" : ""}`}>
        <div
          id="content"
          className={`button-box-container ${!loading ? "visible" : ""}`}
        >
          <h1 className="insurances-header">{t("offerH1")}</h1>
          {/* <AnimatedBeamDemo /> */}
          <AnimatedBeamMiddle />
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
      )}
    </div>
  );
};

export default Home;
