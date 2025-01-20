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
import { BlurFade } from "../components/BlurFade/BlurFade";

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
      image: "https://impactproduction.pl/wp-content/uploads/2024/05/BTS-ING-KOSMOS-WWA-04457-Enhanced-NR-scaled.jpg",
      title: "Filmy wizerunkowe",
      // description: "Opracujemy cały projekt, od stworzenia scenariusza, przez organizację planu zdjęciowego, wynajęcie lokacji i aktorów, po pozostałe kwestie niezbędne do rozpoczęcia nagrań."
    },
    {
      image: "https://andcut.eu/wp-content/uploads/2020/04/AdobeStock_247275495small.jpg",
      title: "Filmy produktowe",
      // description: "Zrealizujemy nagrania na planie zdjęciowym z wykorzystaniem  nowoczesnego sprzętu, w tym profesjonalnego oświetlenia oraz dopracowanej scenografii, które ożywią Twoją wizję."
    },
    {
      image: "https://wspa.pl/wp-content/uploads/2024/03/Check-IT-Lublin-WSPA-2024-12.jpg",
      title: "Relacje z wydarzeń",
      // description: "Zmontujemy nagrany materiał  – wszystko, by stworzyć angażujący, film, który wzbudzi emocje u odbiorców."
    },
    {
      image: "https://images.pexels.com/photos/1809576/pexels-photo-1809576.jpeg?cs=srgb&dl=pexels-pixelcop-1809576.jpg&fm=jpg",
      title: "Nagrania z drona",
      description: " TEST: Kolor korekcja Obejmuje poprawę kolorystyki, kontrastu i nasycenia, aby ujęcia były spójne wizualnie. Dodaje się efekty wizualne, animacje i poprawki dźwiękowe, takie jak synchronizacja lektora i miksowanie ścieżki audio."
    },
    {
      image: "https://thumbs.dreamstime.com/b/iphone-ios-folder-social-media-icons-vector-set-network-screen-colorful-wallpaper-white-background-facebook-instagram-187031401.jpg",
      title: "Filmy na social media",
      // description: "This is the description for slide 5."
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
          <BlurFade delay={0.25} inView><p className="home-p">{t("homeP")}</p></BlurFade>
        
        </div>
      </div>
 
      <div id="offer" className="container-home home ">
      <BlurFade delay={0.25} inView>
      <div className="text-container">
        <h1>Nasza oferta</h1>
      </div>
      </BlurFade>
       <BlurFade delay={0.25} inView>
      <div className="box-container" >
       <Box
       iconPath="/media/reprodukcja.png"
       title="Preprodukcja"
       description="Tutaj Twoje pomysły nabiorą konkretnych kształtów! W tej fazie zajmiemy się opracowaniem koncepcji, oraz angażującego scenariusza. Zaplanujemy harmonogram działań, wybierzemy lokacje i aktorów.  Preprodukcja to kluczowy krok, który wpływa na jakość finalnego materiału, a staranne przygotowanie zwiększa szanse na udaną realizację."/>
              <Box
       iconPath="/media/produkcja.png"
       title="Produkcja"
       description="Produkcja to moment, w którym koncepcje i scenariusze stają się rzeczywistością. Kluczowym aspektem tego etapu jest realizacja zdjęć przy użyciu profesjonalnego sprzętu, w tym odpowiedniego oświetlenia oraz starannie zaprojektowanej scenografii. Na sukces Twojego filmu pracuje cały zespół, w skład którego wchodzą operatorzy kamer, dźwiękowcy, oświetleniowcy oraz kierownik planu."/>
              <Box
       iconPath="/media/postprodukcja.png"
       title="Postprodukcja"
       description="Postprodukcja to finalny etap tworzenia filmu reklamowego, w którym materiał zyskuje ostateczny kształt. To tutaj film nabiera charakteru i staje się kompletny dzięki starannemu montażowi najlepszych ujęć, które łączymy w spójną narrację. W tym procesie koncentrujemy się również na korekcji kolorów, dodawaniu efektów wizualnych oraz tworzeniu ścieżki dźwiękowej, która wzmacnia emocje i przekaz, nadając filmowi wyjątkowy klimat."/>
       </div>
       </BlurFade>
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
        <BlurFade delay={0.25} inView>
          <div className="text-container">
            <h1>{t("homeH1")}</h1>
          </div>
          </BlurFade>
          {/* <BlurFade delay={0.25} inView> */}
          <div className="video-portfolio">
            <div className="relative ">
              <HeroVideoDialog
                className="hidden dark:block "
                animationStyle="from-center"
                credits="Produkcja: FAMA Film, &nbsp;Zdjęcia: Krzysztof Sosnowski,  &nbsp;Montaż: Krzysztof Sosnowski"
                videoSrc="https://www.youtube.com/embed/s3SegEFov6o"
                thumbnailSrc="/media/port1.png"
                thumbnailAlt="East Side Drift"
                title={t("port1")}
               
              />
            </div>
            <div className="relative ">
              <HeroVideoDialog
                className="hidden dark:block "
                animationStyle="from-center"
                   credits="Produkcja: Polarise, &nbsp;Zdjęcia: Krzysztof Sosnowski, &nbsp;Montaż: Krzysztof Sosnowski"
                videoSrc="https://www.youtube.com/embed/-hn6AhsE9Rw"
                thumbnailSrc="/media/port2.png"
                thumbnailAlt="Octane1 - Film produktowy"
                title={t("port2")}
             
              />
            </div>
            <div className="relative ">
              <HeroVideoDialog
                className="hidden dark:block "
                animationStyle="from-center"
                   credits="Produkcja: FAMA Film, &nbsp;Zdjęcia: Krzysztof Sosnowski, &nbsp;Operator drona: Przemek Zdybel,&nbsp; Montaż: Krzysztof Sosnowski"
                videoSrc="https://www.youtube.com/embed/P6YyrBsYmng"
                thumbnailSrc="/media/port3.png"
                thumbnailAlt="Relacja z zawodów podczas Truck Show Grajewo"
                title={t("port3")}
             
              />
            </div>
            <div className="relative ">
              <HeroVideoDialog
                className="hidden dark:block "
                animationStyle="from-center"
                credits="Produkcja: Mental Fly, &nbsp;Zdjęcia: Krzysztof Sosnowski, Michał Środek, &nbsp;Montaż: Krzysztof Sosnowski"
                videoSrc="https://www.youtube.com/embed/Hx5VfUc8O4Q"
                thumbnailSrc="/media/bts5.jpeg"
                thumbnailAlt="Ismena Warszawska - relacja z pokazu mody"
                title={t("port4")}
               
              />
            </div>
            {showMore && (
              <>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                      credits="Produkcja: FAMA Film,&nbsp; Zdjęcia: Krzysztof Sosnowski,&nbsp; Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/5_feKjmTpSE"
                    thumbnailSrc="/media/port5.png"
                    thumbnailAlt="BMW 1600 - projekt własny"
                    title={t("port5")}
                
                  />{" "}
                </div>

                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                       credits="Produkcja: Dzida Film Studio,&nbsp; Zdjęcia: Łukasz Baliński, Bartłomiej Wieloszewski,&nbsp; Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/jclPM5ZWPe8"
                    thumbnailSrc="/media/bts5.jpeg"
                    thumbnailAlt="Dr Irena Eris - relacja z wydarzenia"
                    title={t("port6")}
                   
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                       credits="Produkcja: Splash Media, &nbsp;Zdjęcia: Krzysztof Sosnowski, Michał Środek, &nbsp;Montaż: Michał Środek"
                    videoSrc="https://www.youtube.com/embed/sMt4uqkbVRY"
                    thumbnailSrc="/media/port7.png"
                    thumbnailAlt="MONDRY - film wizerunkowy"
                    title={t("port7")}
                   
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                         credits="Produkcja: Splash Media,&nbsp; Zdjęcia: Michał Środek, Michał Grzyb, &nbsp;Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/NVCT-CbqyfM"
                    thumbnailSrc="/media/port8.png"
                    thumbnailAlt="Meble Wójcik - film wizerunkowy"
                    title={t("port8")}
                  
                  />
                </div>




                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                         credits="Produkcja: FAMA Film, &nbsp;Zdjęcia: Krzysztof Sosnowski, &nbsp;Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/qmKGNlvvNxM"
                    thumbnailSrc="/media/bts5.jpeg"
                    thumbnailAlt="Timberfast - film wizerunkowy"
                    title={t("port9")}
                  
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                         credits="Produkcja: FAMA Film, &nbsp;Zdjęcia: Krzysztof Sosnowski, &nbsp;Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/3xwy-0rYLZQ"
                    thumbnailSrc="/media/bts5.jpeg"
                    thumbnailAlt="Backstage z sesji zdjęciowej"
                    title={t("port10")}
                  
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                         credits="Produkcja: Polarise, Zdjęcia: Krzysztof Sosnowski, Operator drona: Przemek Zdybel, Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/_dBHXOMdkas"
                    thumbnailSrc="/media/port11.png"
                    thumbnailAlt="Agroperfekt - film produktowy"
                    title={t("port11")}
                  
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                         credits="Produkcja: Polarise, &nbsp;Zdjęcia: Kamil Dziubczyński, Krzysztof Sosnowski, &nbsp;Operator drona: Przemek Zdybel,&nbsp; Montaż: Kamil Dziubczyński"
                    videoSrc="https://www.youtube.com/embed/-1VtDOV7BcQ"
                    thumbnailSrc="/media/bts5.jpeg"
                    thumbnailAlt="We Roam Poland - film dokumentalny"
                    title={t("port12")}
                  
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                         credits="Produkcja: FAMA Film, &nbsp;Zdjęcia: Krzysztof Sosnowski, &nbsp;Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/c4Aeq7EHmBw"
                       thumbnailSrc="/media/bts5.jpeg"
                    thumbnailAlt="Timberfast - film wizerunkowy"
                    title={t("port13")}
                  
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                         credits="Produkcja: Splash Media, &nbsp;Zdjęcia: Michał Środek, Michał Grzyb, &nbsp;Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/pzJerK9wR5k"
                     thumbnailSrc="/media/bts5.jpeg"
                    thumbnailAlt="Kubala - film produktowy"
                    title={t("port14")}
                  
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                         credits="Produkcja: Polarise, &nbsp;Zdjęcia: Krzysztof Sosnowski, &nbsp;Operator drona: Przemek Zdybel, &nbsp;Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/Pt9FXClwn_k"
                     thumbnailSrc="/media/bts5.jpeg"
                    thumbnailAlt="Trzy Podkowy - zapowiedź filmu"
                    title={t("port15")}
                  
                  />
                </div>
                <div className="relative ">
                  <HeroVideoDialog
                    className="hidden dark:block "
                    animationStyle="from-center"
                         credits="Produkcja: Polarise, &nbsp;Zdjęcia: Krzysztof Sosnowski, &nbsp;Montaż: Krzysztof Sosnowski"
                    videoSrc="https://www.youtube.com/embed/SHPrruFKpug"
                       thumbnailSrc="/media/bts5.jpeg"
                    thumbnailAlt="Creme - film produktowy"
                    title={t("port16")}
                  
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
      )}    <div className="container-home home ">
         <BlurFade delay={0.25} inView>
      <div className="text-container">
        <h1>Nasze uslugi</h1>
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
