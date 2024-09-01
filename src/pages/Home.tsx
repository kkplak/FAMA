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
                title: "Interstellar",
                thumbnail: "https://www.imcdb.org/i000444.jpg",
              },
              {
                href: "https://www.youtube.com/embed/2LqzF5WauAw",
                title: "Mad Max",
                thumbnail: "https://i.imgur.com/JrPmQe4.jpg",
              },
              {
                href: "https://www.youtube.com/embed/aEtmu3jA5x8",
                title: "Blade Runner",
                thumbnail:
                  "https://www.thedrive.com/wp-content/uploads/content-b/message-editor/1635541968988-40764_going_to_the_chapel_in_a_volvo_s60.jpg?strip=all&quality=95",
              },
              {
                href: "https://www.youtube.com/embed/6ZfuNTqbHE8",
                title: "Infinity War",
                thumbnail:
                  "https://media.gq-magazine.co.uk/photos/5dd7f7dbf5e41800082f05cd/master/pass/225617_Roger_Moore_as_Simon_Templar_in_The_Saint_TV_Series.jpg",
              },
              {
                href: "https://www.youtube.com/embed/w8ok__kQxMM",
                title: "Nomadland",
                thumbnail: "https://pbs.twimg.com/media/B0X5qgLCIAE2KU8.jpg",
              },
              {
                href: "https://www.youtube.com/embed/wr7oWInxT_8",
                title: "Dune",
                thumbnail: "https://www.imcdb.org/i002724.jpg",
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
                <h3>{video.title}</h3>
              </div>
            ))}
          </div>
        </div>

        <div id="content" className="button-box-container">
          <h1 className="insurances-header">{t("offerH1")}</h1>
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
