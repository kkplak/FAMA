import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import TextReveal from "../components/TextReveal/TextReveal";
import HeroVideoDialog from "../components/HeroDialog/HeroVideoDialog";

import Sticky from "../components/Sticky/Sticky";

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLanguage = i18n.language;

  const [loading, setLoading] = useState(true);
  const [scrollable, setScrollable] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const videoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const offersRefs = useRef<Array<HTMLDivElement | null>>([]); // Ref for offers

  const offersData = [
    {
      title: t("offer1H2"),
      items: [t("offer1Item1"), t("offer1Item2"), t("offer1Item3")],
    },
    {
      title: t("offer2H2"),
      items: [t("offer2Item1"), t("offer2Item2"), t("offer2Item3")],
    },
    {
      title: t("offer3H2"),
      items: [t("offer3Item1"), t("offer3Item2"), t("offer3Item3")],
    },
    {
      title: t("offer4H2"),
      items: [t("offer4Item1"), t("offer4Item2"), t("offer4Item3")],
    },
    {
      title: t("offer5H2"),
      items: [t("offer5Item1")],
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
      if (ref) observer.observe(ref); // Observe the offers section
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
    <div className='homepage'>
      <div className={`loader ${loading ? "" : "hidden"}`}>
        <h1 className='hero-title'>{t("fama")}</h1>
        {/* <h1 className="hero-title film">{t("film")}</h1> */}
      </div>

      <div
        id='home'
        className={`hero-section ${contentVisible ? "visible" : ""}`}
      >
        <iframe
          src='https://www.youtube.com/embed/5_feKjmTpSE?autoplay=1&mute=1&loop=1&playlist=5_feKjmTpSE'
          frameBorder='0'
          allow='autoplay; loop; muted'
          allowFullScreen
          title='FAMA Video'
          className='background-video'
        ></iframe>
        <div className='overlay'>
          <Sticky offset={60}>
            <h1 className='hero-title'>{t("fama")}</h1>
          </Sticky>
          {/* <h1 className='hero-title film'>{t("film")}</h1> */}
        </div>
        {/* <div className="subtitles-container">
          <Subtitles />
        </div> */}
      </div>

      <div id='portfolio' className={`content ${!loading ? "visible" : ""}`}>
        <div className='container-home home'>
          <div className='text-container'>
            <h1>{t("homeH1")}</h1>
          </div>

          <div className='video-portfolio'>
            <div className='relative '>
              <HeroVideoDialog
                className='hidden dark:block '
                animationStyle='from-center'
                videoSrc='https://www.youtube.com/embed/3xwy-0rYLZQ'
                thumbnailSrc='/media/DerwiszBMW.png'
                thumbnailAlt='Hero Video'
                title={t("port1")}
              />
            </div>
            <div className='relative '>
              <HeroVideoDialog
                className='hidden dark:block '
                animationStyle='from-center'
                videoSrc='https://www.youtube.com/embed/3xwy-0rYLZQ'
                thumbnailSrc='/media/ratownik.png'
                thumbnailAlt='Hero Video'
                title={t("port2")}
              />
            </div>
            <div className='relative '>
              <HeroVideoDialog
                className='hidden dark:block '
                animationStyle='from-center'
                videoSrc='https://www.youtube.com/embed/3xwy-0rYLZQ'
                thumbnailSrc='/media/one-gog.png'
                thumbnailAlt='Hero Video'
                title={t("port3")}
              />
            </div>
            <div className='relative '>
              <HeroVideoDialog
                className='hidden dark:block '
                animationStyle='from-center'
                videoSrc='https://www.youtube.com/embed/3xwy-0rYLZQ'
                thumbnailSrc='/media/creme.png'
                thumbnailAlt='Hero Video'
                title={t("port4")}
              />
            </div>
            {/* {[
              {
                href: "https://youtu.be/5_feKjmTpSE",
                title: "port1",
                thumbnail: "/media/DerwiszBMW.png",
              },
              {
                href: "https://www.youtube.com/watch?v=-1VtDOV7BcQ",
                title: "port2",
                thumbnail: "/media/ratownik.png",
              },
              {
                href: "https://www.youtube.com/watch?v=lU7ccvRv-BU",
                title: "port3",
                thumbnail: "/media/drutex.png",
              },
              {
                href: "https://www.youtube.com/watch?v=SHPrruFKpug",
                title: "port4",
                thumbnail: "/media/creme.png",
              },
              {
                href: "https://www.youtube.com/watch?v=3xwy-0rYLZQ",
                title: "port5",
                thumbnail: "/media/one-gog.png",
              },
              {
                href: "https://www.youtube.com/watch?v=qmKGNlvvNxM",
                title: "port6",
                thumbnail: "/media/timberfast.png",
              },
            ].map((video, index) => (
              <div
                key={index}
                className="video-box"
                ref={(el) => (videoRefs.current[index] = el)}
              >
                <div
                  className="video-thumbnail"
                  onClick={() => openModal(video.href)}
                  style={{
                    backgroundImage: `url(${video.thumbnail})`,
                    cursor: "pointer",
                  }}
                ></div>
                <h3>{t(video.title)}</h3>
              </div>
            ))} */}
          </div>
          <div className='portfolio-cta'>
            <a href='https://www.youtube.com/@fama_film'>
              link do yt - and more?
            </a>
          </div>
        </div>

        <div
          id='content'
          className={`button-box-container ${!loading ? "visible" : ""}`}
        >
          <h1 className='insurances-header'>{t("offerH1")}</h1>
          <div className='offers-container'>
            {offersData.map((offer, index) => (
              <div
                key={index}
                className='offer-card'
                ref={(el) => (offersRefs.current[index] = el)} // Add ref to offers
              >
                <h2 className='offer-title'>{offer.title}</h2>
                <ul className='offer-list'>
                  {offer.items.map((item, idx) => (
                    <li key={idx} className='offer-item'>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="wrapper">
          <motion.div
            className="container"
            style={{
              scale,
            }}
          >
            <motion.div
              className="item"
              style={{
                scaleY: scrollYProgress,
              }}
            />
          </motion.div>
        </div> */}
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
      )}
    </div>
  );
};

export default Home;
