import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ButtonBox from "../components/ButtonBox/ButtonBox";
import Sticky from "../components/Sticky/Sticky";
import LanguageSwitcher from "../components/LanguageSwitcher/LanguageSwitcher";
import Subtitles from "../components/Subtitles/Subtitles";

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

    return () => {
      if (videoRefs.current) {
        videoRefs.current.forEach((ref) => ref && observer.unobserve(ref));
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
    <div className="homepage">
      <div className={`loader ${loading ? "" : "hidden"}`}>
        <h1 className="hero-title">{t("FAMA")}</h1>
      </div>

      <div
        id="home"
        className={`hero-section ${contentVisible ? "visible" : ""}`}
      >
        <iframe
          src="https://www.youtube.com/embed/-1VtDOV7BcQ?autoplay=1&mute=1&loop=1&playlist=-1VtDOV7BcQ"
          frameBorder="0"
          allow="autoplay; loop; muted"
          allowFullScreen
          title="FAMA Video"
          className="background-video"
        ></iframe>
        <div className="overlay">
          <Sticky offset={20}>
            <h1 className="hero-title">{t("FAMA")}</h1>
          </Sticky>
        </div>
        <div className="subtitles-container">
          {" "}
          <Subtitles />
        </div>
      </div>

      <div id="portfolio" className={`content ${!loading ? "visible" : ""}`}>
        <div className="container-home home">
          <div className="text-container">
            <h1>{t("homeH1")}</h1>
          </div>

          <div className="video-portfolio">
            {[
              {
                href: "https://www.youtube.com/embed/zSWdZVtXT7E",
                title: "port1", // Use JSON key
                thumbnail: "https://i.redd.it/50x5fvtqk0u71.jpg",
              },
              {
                href: "https://www.youtube.com/embed/2LqzF5WauAw",
                title: "port2", // Use JSON key
                thumbnail:
                  "https://demarchelier.com/wp-content/uploads/2021/06/328-3286987_cinematography.jpg",
              },
              {
                href: "https://www.youtube.com/embed/aEtmu3jA5x8",
                title: "port3", // Use JSON key
                thumbnail:
                  "https://wallpapercrafter.com/desktop1/651631-turkey-ankara-trkiye-night-street-truck-cinematic.jpg",
              },
              {
                href: "https://www.youtube.com/embed/6ZfuNTqbHE8",
                title: "port4", // Use JSON key
                thumbnail:
                  "https://theblackandwhite.net/wp-content/uploads/2024/02/Screen-Shot-2024-02-15-at-11.58.17-PM.jpg",
              },
              {
                href: "https://www.youtube.com/embed/w8ok__kQxMM",
                title: "port5", // Use JSON key
                thumbnail:
                  "https://e1.pxfuel.com/desktop-wallpaper/875/48/desktop-wallpaper-road-in-black-and-white-%E2%9D%A4-for-ultra-black.jpg",
              },
              {
                href: "https://www.youtube.com/embed/wr7oWInxT_8",
                title: "port6", // Use JSON key
                thumbnail:
                  "https://e0.pxfuel.com/wallpapers/662/400/desktop-wallpaper-black-swan.jpg",
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
            ))}
          </div>
        </div>

        <div id="content" className="button-box-container">
          <h1 className="insurances-header">{t("offerH1")}</h1>
          <div className="offers-container">
            {offersData.map((offer, index) => (
              <div key={index} className="offer-card">
                <h2 className="offer-title">{offer.title}</h2>
                <ul className="offer-list">
                  {offer.items.map((item, idx) => (
                    <li key={idx} className="offer-item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
